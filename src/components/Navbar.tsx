import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../assets/logo.svg";

const Logo = styled.div`
  height: 40px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 20px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
`;

const CartButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-left: 20px;
`;

const CategoriesToggle = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
`;

const CategoriesContainer = styled.div<{ showCategories: boolean }>`
  position: absolute;
  top: 100%;
  display: ${(props) => (props.showCategories ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
  right: 40px;
  width: max-content;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const CategoryLink = styled.a<{ isLogout?: boolean }>`
  color: ${(props) => (props.isLogout ? "#fff" : "#000000")};
  text-decoration: none;
  margin-top: 5px;
  font-size: 16px;
  background-color: ${(props) => (props.isLogout ? "#1F3E82" : "#fbd02d")};
  font-weight: bold;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background-color: ${(props) => (props.isLogout ? "#F47458" : "#F47458")};
  }
`;

const LogoutCategoryLink = styled(CategoryLink)`
  &:hover {
    background-color: #881e06;
  }
`;

const NavbarContainer = styled.div`
  position: fixed;
  background-color: #fbd02d;
  color: #000000;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    ${Logo} {
      width: 100px;
    }

    ${SearchContainer} {
      flex: 1;
      margin-left: 10px;
    }

    ${SearchInput} {
      width: 100%;
    }

    ${CartButton}, ${CategoriesToggle} {
      font-size: 24px;
      margin-left: 10px;
    }

    ${CategoriesContainer} {
      top: 60px;
      right: 10px;
      left: auto;
      width: auto;
    }
  }
`;

interface NavbarProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  onLogout,
  ...props
}) => {
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setShowCategories(false);
    router.push(`/?category=${encodeURIComponent(category)}`, undefined, {
      shallow: true,
    });
  };

  const handleLogoClick = () => {
    setActiveCategory(null);
    router.push("/", undefined, { shallow: true });
  };

  console.log(categories);

  return (
    <NavbarContainer>
      <Logo>
        <Image width={95} src={LogoImage} alt="Logo" />
      </Logo>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search products..." />
        <CartButton>
          <FaShoppingCart />
        </CartButton>{" "}
      </SearchContainer>
      <CategoriesToggle onClick={toggleCategories}>
        {showCategories ? <FaTimes /> : <FaBars />}
      </CategoriesToggle>
      <CategoriesContainer showCategories={showCategories}>
        {categories.map((category) => (
          <CategoryLink
            key={category}
            href={`#${category}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
          </CategoryLink>
        ))}
        {onLogout && (
          <LogoutCategoryLink isLogout onClick={onLogout}>
            Logout
          </LogoutCategoryLink>
        )}
      </CategoriesContainer>
    </NavbarContainer>
  );
};

export default Navbar;
