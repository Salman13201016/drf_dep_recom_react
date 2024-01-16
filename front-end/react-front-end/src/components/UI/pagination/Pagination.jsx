
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({totalPost, postPerPage, currentPage, changePage}) => {
    let items = [];
    for (
      let number = 1;
      number <= Math.ceil(totalPost / postPerPage);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => changePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    const handleDecrement = () =>{
        if(currentPage <= 1){
            return
        }else{
            changePage(currentPage-1)
        }
    }
    const handleIncrement = () =>{
        if(currentPage >= (Math.ceil(totalPost/postPerPage))){
            return
        }else{
            changePage(currentPage+1)
        }
    }
  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={handleDecrement} />
        {items}
        <Pagination.Next onClick={handleIncrement} />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
