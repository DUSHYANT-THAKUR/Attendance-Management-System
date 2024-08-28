import React, { useState } from "react";
import "./Content/Content.css"
import Calendar from "./Calender/Calender";
// import SubCards from "./DashboardSubComponent/Cards/SubCards";
// import RACard from "./DashboardSubComponent/Cards/RACards";
// import MenuIcon from '@mui/icons-material/Menu';

// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

// import { Dialog, DialogContent, DialogTitle, Icon } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CloseIcon from '@mui/icons-material/Close';

const ResourceAssetst = () => {
  // const [activeSection, setActiveSection] = useState('memos');

  // const handleNavClick = (section) => {
  //   setActiveSection(section);
  // };
  // const itemData = [
  //   {
  //     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //     title: 'Breakfast',
  //     author: '@bkristastucchio',
  //     rows: 2,
  //     cols: 2,
  //     featured: true,
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  //     title: 'Burger',
  //     author: '@rollelflex_graphy726',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  //     title: 'Camera',
  //     author: '@helloimnik',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  //     title: 'Coffee',
  //     author: '@nolanissac',
  //     cols: 2,
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  //     title: 'Hats',
  //     author: '@hjrc33',
  //     cols: 2,
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //     title: 'Honey',
  //     author: '@arwinneil',
  //     rows: 2,
  //     cols: 2,
  //     featured: true,
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //     title: 'Basketball',
  //     author: '@tjdragotta',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //     title: 'Fern',
  //     author: '@katie_wasserman',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //     title: 'Mushrooms',
  //     author: '@silverdalex',
  //     rows: 2,
  //     cols: 2,
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //     title: 'Tomato basil',
  //     author: '@shelleypauls',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //     title: 'Sea star',
  //     author: '@peterlaster',
  //   },
  //   {
  //     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //     title: 'Bike',
  //     author: '@southside_customs',
  //     cols: 2,
  //   },
  // ];


  // const [open, setOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleClickOpen = (index) => {
  //   setCurrentImageIndex(index);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleNext = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  // };

  // const handlePrev = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex - 1 + itemData.length) % itemData.length);
  // };


  return (
    <div className="container-fluid">
      <div className="resource-container">
        <div className="row ">
          {/* <div className="col-lg-8 subnavbar">
            <h5 className="px-4 mt-4 res-heading">Resources and Assets</h5>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                <MenuIcon className="fs-1"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item me-3">
                      <a
                        className={`nav-link ${activeSection === 'memos' ? 'active text-dark border-bottom-blue' : 'text-dark'}`}
                        // href="#"
                        style={{cursor:"pointer"}}
                        onClick={() => handleNavClick('memos')}
                      >
                        Memos & Circulars
                      </a>
                    </li>
                    <li className="nav-item me-3">
                      <a
                        className={`nav-link ${activeSection === 'brochures' ? 'active text-dark border-bottom-blue' : 'text-dark'}`}
                        // href="#"
                        style={{cursor:"pointer"}}
                        onClick={() => handleNavClick('brochures')}
                      >
                        Brochures
                      </a>
                    </li>
                    <li className="nav-item me-3">
                      <a
                        className={`nav-link ${activeSection === 'marketing' ? 'active text-dark border-bottom-blue' : 'text-dark'}`}
                        // href="#"
                        style={{cursor:"pointer"}}
                        onClick={() => handleNavClick('marketing')}
                      >
                        Marketing Materials
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeSection === 'gallery' ? 'active text-dark border-bottom-blue' : 'text-dark'}`}
                        // href="#"
                        style={{cursor:"pointer"}}
                        onClick={() => handleNavClick('gallery')}
                      >
                        Gallery
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div id="content">
              {activeSection === 'memos' && (
                <div id="memos" className="content-section">
                 <div className="row">
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday" />
                    </div>
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                      
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className=" col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                    <div className="col-md-4 col-sm-6">
                    <RACard
                      image="https://via.placeholder.com/300"
                      title="Title"
                      paragraph="Updated yesterday"/>
                    </div>
                 </div>
                </div>
              )}
              {activeSection === 'brochures' && (
                <div id="brochures" className="content-section">
                  Content for Brochures
                </div>
              )}
              {activeSection === 'marketing' && (
                <div id="marketing" className="content-section">
                  Content for Marketing Materials
                </div>
              )}
              {activeSection === 'gallery' && (
                <div id="gallery" className="content-section">
                 <ImageList sx={{ width: 880, height: 910 }} style={{marginLeft:"0px",paddingLeft:"0px"}}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {itemData.map((item, index) => (
          <ImageListItem key={item.img} onClick={() => handleClickOpen(index)} sx={{ cursor: 'pointer' }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" onClick={handlePrev} aria-label="previous">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" onClick={handleNext} aria-label="next">
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            srcSet={`${itemData[currentImageIndex].img}?w=800&fit=crop&auto=format&dpr=2 2x`}
            src={`${itemData[currentImageIndex].img}?w=800&fit=crop&auto=format`}
            alt={itemData[currentImageIndex].title}
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Dialog>
                </div>
              )}
            </div>
          </div> */}
          <div className="col-lg-8 subnavbar">
 Report part
          </div>
          <div className="col-lg-4">
            <Calendar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAssetst;