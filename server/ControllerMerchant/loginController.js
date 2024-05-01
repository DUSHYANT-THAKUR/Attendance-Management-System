const config = require("../config/config");
const path = require("path");
const emailvalidator = require("email-validator");
const otpGenerator = require("otp-generator");
var dateTime = require("node-datetime");
var md5 = require("md5");

const nodemailer = require("nodemailer");
const send_mail = require("../helper/send-mail");
var dt = dateTime.create();
var formatted_date = dt.format("Y-m-d H:M:S");

const filepath = path.join(__dirname, "../../client/public/document");
const jwt = require("jsonwebtoken");
const mysqlcon = require("../config/db_connection");
const os = require("os");
function getLocalIPAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const interfaceName in interfaces) {
    interfaces[interfaceName].forEach((addressInfo) => {
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        addresses.push(addressInfo.address);
      }
    });
  }
  let ipAddressParts = addresses[0].split(".");
  let systemIp = ipAddressParts[2];
  return systemIp;
}


const loginCont = {
  register: async function (req, res) {
    try {
      var request = req.body;
      if (request) {
        if (request.email && emailvalidator.validate(request.email)) {
          var password = request.password;
          if (password) {
            if (request.password != request.confirmpassword) {
              res.status(201).json({
                status: false,
                message: "Password and confirm password not match",
                data: [],
              });
            } else {
              var em = { email: request.email };
              var sql = "SELECT id, email FROM tbl_emp WHERE ?";
              var dbquery = await mysqlcon(sql, em);
              if (dbquery[0]) {
                // If user already exists
                res.status(202).json({
                  status: false,
                  message: "Email id already exists",
                  data: [],
                });
              } else {
                // If user does not exist, insert the data
                var secret_key = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });
                var test_secret_key = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });
                var token = otpGenerator.generate(8, {
                  upperCaseAlphabets: true,
                  specialChars: false,
                });

                var user_data = {
                  name: request.name,
                  email: request.email,
                  password: md5(request.password),
                  created_on: formatted_date,
                };

                let result = await mysqlcon(
                  "INSERT INTO tbl_emp SET ?",
                  user_data
                );
                if (!result) {
                  res.status(201).json({
                    status: false,
                    message: "Error to create profile",
                    data: [],
                  });
                } else {
                  jwt.sign(
                    { id: result.insertId },
                    config.JWT_SECRET,
                    { expiresIn: config.JWT_EXPIRY },
                    (err, token) => {
                      if (err) throw new Error(err);
                      var reg = {
                        id: result.insertId,
                        user_id: result.insertId,
                        token: token,
                      };
                      var page_path = path.join(
                        __dirname,
                        "../views/signup.ejs"
                      );
                      send_mail.mail(
                        {
                          email: request.email,
                          password: request.password,
                          subject: "Verification Email",
                        },
                        "signup"
                      );
                      res.status(200).json({
                        status: true,
                        message: "Profile created successfully",
                        data: reg,
                      });
                    }
                  );
                }
              }
            }
          } else {
            res.status(201).json({
              status: false,
              message: "Enter a valid password",
              data: [],
            });
          }
        } else {
          res.status(201).json({
            status: false,
            message: "Enter a valid email id",
            data: [],
          });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "Enter a valid email id and password",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    }
  },
  login: async function (req, res) {
    const request = req.body;
    if (request) {
      try {
        if (request.email && emailvalidator.validate(request.email)) {
          var password = request.password;
          if (password) {
            sql = "SELECT * FROM tbl_emp where email = ? AND password = ?";
            var dbquery = await mysqlcon(sql, [
              request.email,
              md5(request.password),
            ]);
            if (dbquery[0]) {
              const token = jwt.sign(
                { id: dbquery[0].id },
                config.JWT_SECRET,
                {
                  expiresIn: config.JWT_EXPIRY,
                }
              );
              dbquery[0]["token"] = token;
               if(dbquery[0].complete_profile==1)
               {
              if(dbquery[0].status==1)
              {
                const systemIp = getLocalIPAddresses();
                let databseFatchIp = dbquery[0].ipaddress;
                let databaseIp = databseFatchIp.split(".");
                databaseIp = databaseIp[2];
                if (databaseIp == systemIp) {
                  res.status(200).json({
                    message: "Login successfully",
                    data: dbquery[0],
                  });
                } else {
                  res.status(201).json({
                    status: false,
                    message: "You are out of company location",
                    data: [],
                  });
                }
              } else {
                res
                    .status(201)
                    .json({
                      status: false,
                      message:
                        "Your profile is active now, It is in under-review wait 24 hours.",
                      data: [],
                    });
              }
               }
               else {
                return res.status(200).json({
                  message: "Incomplete Profile",
                  data: dbquery[0],
                });
               }
            
            } else {
              res.status(201).json({
                status: false,
                message: "You entered a wrong credentials.",
                data: [],
              });
            }
          } else {
            res.status(201).json({
              status: false,
              message: "Enter a valid password",
              data: [],
            });
          }
        } else {
          res.status(201).json({
            status: false,
            message: "Enter a valid email id",
            data: [],
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          status: false,
          message: "Error to complete task.",
          data: [],
        });
      }
    } else {
      res.status(201).json({
        status: false,
        message: "Enter valid email and password",
        data: [],
      });
    }
  },
  profileImagePath: async function (req, res) {
    try {
      var id = req.user.profile_img;
      return res.status(200).json(
        {
          result : id
        }
      )
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: result
      });
    }
  },
  tokenMail: async function(req,res){
    const { email } = req.body;
    const sql = "SELECT verification_token FROM tbl_emp WHERE email = ?";
    try {
      const result = await mysqlcon(sql, [email]);
      const verificationToken = result[0].verification_token;
      if (result.length === 0) {
        return res.status(404).json({ message: 'Email Not found.' });
      }
      var page_path = path.join(__dirname, '../views/forgetpassword.ejs');
      console.log(page_path);
      send_mail.mail({email:email,token:verificationToken, subject:'Password Reset'}, 'forgetpassword')
      return res.status(200).json({ message: 'Email sent successfully.' });
  
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error.' });
    }
  },
  forgotPassword: async function (req, res) {
    try {
      const { newpassword, confirmPassword, userVerificationToken } = req.body;
      if (!newpassword || !confirmPassword || !userVerificationToken) {
        return res.status(400).json({
          message:
            "Please provide password, confirmPassword, and userVerificationToken.",
        });
      } else if (newpassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Password and confirmPassword do not match." });
      } else {
        let sql =
          "SELECT verification_token FROM `tbl_emp` WHERE verification_token = ?;";
        const dbResult = await mysqlcon(sql, [userVerificationToken]);
        if (dbResult.length === 0) {
          return res.status(404).json({ message: "User not found." });
        }
        const dbVerificationToken = dbResult[0].verification_token;
        if (userVerificationToken === dbVerificationToken) {
          let details = {
            password: md5(newpassword),
          };
          let sql2 = "UPDATE tbl_emp SET ? WHERE verification_token = ?";
          let result = await mysqlcon(sql2, [details, userVerificationToken]);
          if (result.length === 0) {
            return res
              .status(200)
              .json({ message: "Password changed not successfully." });
          } else {
            return res
              .status(200)
              .json({ message: "Password changed successfully." });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Verification tokens do not match." });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred.",
        error: error,
      });
    }
  },
  SystemDetails: async function (req, res) {
    try {
      var request = req.body;
      let id = req.user.id;
      if (request) {
        if (request.deviceName && request.ipaddress) {
          var device_data = {
            device: request.deviceName,
            ipaddress: request.ipaddress,
            complete_profile : '1'
          };

          let result = await mysqlcon("UPDATE tbl_emp SET ? WHERE id = ?", [
            device_data,
            id,
          ]);
          if (!result) {
            res.status(201).json({
              status: false,
              message: "Error updating device details",
              data: [],
            });
          } else {
            res.status(200).json({
              status: true,
              message: "Device details updated successfully",
              data: result,
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message: "Please provide device name and IP address",
            data: [],
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "Please provide request body",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          status: false,
          message: "Error inserting device details.",
          data: [],
        });
    }
  },
  updateProfile: async function (req, res) {
    try {
      var request = req.body;
      const img = req.file;
      console.log(img)
      if (request) {
        if (
          request.empid &&
          request.gender &&
          request.dob &&
          request.doj &&
          request.team 
        ) {
          var em = { id: req.user.id };
          var sql = "SELECT id FROM tbl_emp WHERE ?";
          var dbquery = await mysqlcon(sql, em);
          if (dbquery[0]) {
            var user_data = {
              empid: request.empid,
              gender: request.gender,
              dob: request.dob,
              doj: request.doj,
              team: request.team,
              profile_img: img.originalname,
            };

            let result = await mysqlcon("UPDATE tbl_emp SET ? WHERE id = ?", [
              user_data,
              req.user.id,
            ]);
            if (!result) {
              res.status(201).json({
                status: false,
                message: "Error updating profile",
                data: [],
              });
            } else {
              res.status(200).json({
                status: true,
                message: "Profile updated successfully",
                data: result,
              });
            }
          } else {
            res.status(404).json({
              status: false,
              message: "User not found",
              data: [],
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message:
              "Please provide all required fields: empid, gender, dob, doj, team, nationality",
            data: [],
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "Please provide request body",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: false, message: "Error updating profile.", data: [] });
    }
  },
};

module.exports = loginCont;
