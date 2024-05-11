import React from "react";
import { Container, Row, Col, Pagination, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/Store/GlobalState";

const MultiPurposeItemDisplay = ({ items }) => {
    const navigate = useNavigate();
  const { state, openItemDetail, addToCart, removeFromCart } = useGlobalState();
  const { cart } = state;
  const itemsPerPage = 36; // Adjust as necessary
  const [currentPage, setCurrentPage] = useState(1);

  const [localItems, setLocalItems] = useState(
    items.map((item) => ({
      ...item,
      isLoved: item.loved || false,
    }))
  );

  useEffect(() => {
    setLocalItems(
      items.map((item) => ({
        ...item,
        isLoved: item.loved || false,
        inCart: cart.some((cartItem) => cartItem._id === item._id),
    }))
    );
  }, [items, cart]);

  const toggleLove = (id) => {
    const updatedItems = localItems.map((item) => {
      if (item._id === id) {
        return { ...item, isLoved: !item.isLoved };
      }
      return item;
    });
    setLocalItems(updatedItems);
  };

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = localItems.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenDetail = (item) => {
    openItemDetail(item, navigate);
    };

    if (!currentItems.length) {
      return <h2>No items found</h2>;
    } else {



  return (
    <Container id="item-display">
      <Row>
        {currentItems.map((item) => (
          <Col key={item._id} xs={6} md={3} className="mb-4">
            <div className="item-card">
                <div 
                id='redirect' 
                onClick={() => handleOpenDetail(item)}
                style={{cursor: "pointer"}}
                >
              <img
                src={item.image}
                alt={item.description}
                className="img-fluid"
              />
              <p
                style={{
                  display: "inline",
                  margin: "5px",
                  fontWeight: "bold",
                  backgroundColor: "lightblue",
                  borderRadius: "5px",
                }}
              >
                {item.name}
              </p>
                </div>
              <FontAwesomeIcon
                icon={item.isLoved ? solidHeart : regularHeart}
                style={{
                  color: item.isLoved ? "pink" : "grey",
                  cursor: "pointer",
                }}
                onClick={() => toggleLove(item._id)}
              />
              <p
                style={{
                  backgroundColor: "lightblue",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {item.description}
              </p>
              <p className="text-muted">
                {item.discount > 0 ? (
                  <>
                    <span
                      style={{
                        backgroundColor: "red",
                        textDecoration: "line-through",
                        borderRadius: "5px",
                      }}
                    >
                      ${item.originalPrice}
                    </span>{" "}
                    <span
                      style={{
                        backgroundColor: "lightgreen",
                        fontWeight: "bolder",
                        borderRadius: "5px",
                      }}
                    >
                      ${item.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      backgroundColor: "lightgreen",
                      fontWeight: "bolder",
                      borderRadius: "5px",
                    }}
                  >
                    ${item.originalPrice}
                  </span>
                )}
              </p>
              {item.promotion && (
                <p
                  style={{
                    backgroundColor: "lightgreen",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {item.promotion}
                </p>
              )}
              <Button variant="info" style={{height:'30px', fontSize:'12px' }} onClick={() => addToCart(item)}>Quick Add</Button>
                            {item.inCart && <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>}
            </div>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(pageCount).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        />
        <Pagination.Last
          onClick={() => handlePageChange(pageCount)}
          disabled={currentPage === pageCount}
        />
      </Pagination>
    </Container>
  );
};
}
// }

export default MultiPurposeItemDisplay;
