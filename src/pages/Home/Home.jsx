import React, { useState } from "react";
import { Breadcrumb, Drawer, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.module.scss";
import selectProducts from "../../selectors/products";

import { setShowSimilar } from "../../store/commonReducer/reducer";

import { Cards, FilterBar, SortMenu } from "../../components";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { AiOutlineFilter } from "react-icons/ai";

export const Home = () => {
  const filters = useSelector((state) => state.filter);
  const common = useSelector((state) => state.common);
  const sort = useSelector((state) => state.sort.sortType);
  const dispatch = useDispatch();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const products = selectProducts(
    useSelector((state) => state.cart.allProducts),
    { sort, filters }
  );

  const { height, width } = useWindowDimensions();

  return (
    <div>
      <div className={styles.home}>
        <div className={styles.rows}>
          <div className={styles.row1}>
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Clothing</Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className={styles.breadcrumbItem}>
                  Shirts For Men & Women
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.row2}>
            <span>Shirts For Men & Women</span> - {products.length} items
          </div>
          <div className={styles.row3}>
            <h1>
              {width > 800 ? (
                <>Filters</>
              ) : (
                <button onClick={() => setShowFilterModal(true)}>
                  Filters <AiOutlineFilter />
                </button>
              )}
            </h1>
            <SortMenu />
          </div>
        </div>
        <div className={styles.main}>
          {width > 800 ? <FilterBar /> : <></>}
          <Cards data={products} forWishlist={false} />
        </div>
      </div>
      <Drawer
        title="Similar Products"
        placement="right"
        closable={true}
        onClose={() =>
          dispatch(
            setShowSimilar({
              query: common.queryForSimilar,
              id: common.similarFor,
            })
          )
        }
        open={common.showSimilar}
        width={324}
        closeIcon={true}
      >
        <Cards
          forWishlist={false}
          data={selectProducts(products, {
            filters: { ...filters, text: common.queryForSimilar },
            sort,
          }).filter((item) => item.id !== common.similarFor)}
        />
      </Drawer>
      <Modal
        width={450}
        title="Select Size"
        visible={showFilterModal}
        onCancel={() => setShowFilterModal(false)}
        footer={false}
      >
        <FilterBar />
      </Modal>
    </div>
  );
};
