import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useFetchCategories from "../Hooks/usefetchCategories";
import useFetchProducts from "../Hooks/useFetchProducts";
import LoadingScreen from "./LoadingScreen";

const Header = styled.div`
  height: 23vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #444;
  @media (max-width: 768px) {
    height: 15vh;
  }
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Info = styled.h5`
  color: white;
  font-family: Arial, sans-serif;
  margin-bottom: 0;
`;
const Link = styled.a`
  color: white;
  cursor: pointer;
`;
const Phone = styled.h5`
  color: white;
  font-family: Arial, sans-serif;
  margin-top: 0;
`;
const Title = styled.h1`
  color: white;
  margin-top: 0;
`;
// Lower section of the page
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesSection = styled.div`
  flex: 2;
  height: 15vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    height: auto;
    flex: 1 1 100%;
  }
`;

const MenuSection = styled.div`
  margin-top: 20px;
  flex: 5;
  height: 27vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    height: auto;
  }
`;
// Button section
const SectionButton = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10%;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 10px;
    margin-left: -50vw;
    margin-right: -50vw;
    left: 50%;
    right: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100vw;
    width: 100vw;
  }
`;
const ContainerButton = styled.div`
  scroll-snap-align: center;
  display: flex;
  flex-direction: row;
  padding-left: 5px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    position: relative;
  }
`;

const Button = styled.button`
  background-color: #070b07;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-radius: 20px;
  width: fit-content;
  inline-size: max-content;
  @media only screen and (max-width: 768px) {
    width: 100%;
    /* min-width: 80vh; */
    font-size: 20px;
    margin: 5px;
  }
`;
//Menu
const Menu = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`;

const ContainerMenu = styled.div`
  flex: 1 1 300px;
  margin: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const Items = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Item = styled.li`
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
`;
const ItemCategory = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;
const Itemstyle = styled.span`
  &:last-child {
    font-weight: bold;
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const categoryRefs = useRef({});
  const [menuItems] = useFetchProducts();
  const [categories] = useFetchCategories();
  useEffect(() => {
    setTimeout(() => {
      if (menuItems) {
        setLoading(false);
      }
    }, 2000);
  }, [menuItems]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleButtonClick = (categoryName) => {
    const categoryElement = categoryRefs.current[categoryName];
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const groupByCategory = (items) => {
    if (items) {
      const groupedItems = {};

      items.forEach((item) => {
        if (groupedItems[item.category]) {
          groupedItems[item.category].push(item);
        } else {
          groupedItems[item.category] = [item];
        }
      });

      return groupedItems;
    } else {
      return "";
    }
  };

  const groupedMenuItems = groupByCategory(menuItems);
  return (
    <div>
      <Header>
        <Container>
          <Info>
            Menu Created By{" "}
            <Link
              href="https://www.linkedin.com/in/elio-hanna/"
              target="_blank"
            >
              Elio HANNA
            </Link>
          </Info>
          <Phone>Tel: 71266943</Phone>
        </Container>
        <Container>
          <Title>ZoukyHouse Menu</Title>
        </Container>
      </Header>
      <ContentWrapper>
        <CategoriesSection>
          <SectionButton>
            {categories &&
              categories.map((category) => (
                <ContainerButton key={category.idCategory}>
                  <Button
                    onClick={() => handleButtonClick(category.categoryName)}
                  >
                    {category.categoryName}
                  </Button>
                </ContainerButton>
              ))}
          </SectionButton>
        </CategoriesSection>
        <MenuSection>
          <Menu>
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <ContainerMenu
                className="category"
                key={category}
                ref={(ref) => {
                  categoryRefs.current[category] = ref;
                }}
              >
                <Items>
                  <ItemCategory>{category}</ItemCategory>
                  {items.map((item) => (
                    <Item key={item.idproduct}>
                      <Itemstyle>{item.productName}</Itemstyle>
                      <Itemstyle>
                        {" "}
                        ${parseFloat(item.productPrice).toFixed(2)}
                      </Itemstyle>
                    </Item>
                  ))}
                </Items>
              </ContainerMenu>
            ))}
          </Menu>
        </MenuSection>
      </ContentWrapper>
    </div>
  );
};

export default Home;
