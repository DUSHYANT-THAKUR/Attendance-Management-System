import Pagination from "@mui/material/Pagination";
const Paginations = ({ setPage, page, totalPage, message }) => {
    const pageNumber = (e, p) => {
      setPage(p);
    };
    return (
      <>
        <div className="mt-5 d-flex justify-content-between">
          <div>
            <div className="showingdata">{message}</div>
          </div>
          <div>
            <Pagination
              shape="rounded"
              count={totalPage}
              page={page}
              defaultPage={5}
              siblingCount={0}
              size="large"
              color="primary"
              onChange={pageNumber}
            />
          </div>
        </div>
      </>
    );
  };
  export default Paginations;
  
  //  const [totalPage, setTotalPage] = useState(1);
 //  const [page, setPage] = useState(1);
  // <Paginations setPage={setPage} page={page} totalPage={totalPage} message={message} />