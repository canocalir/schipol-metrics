import {useEffect, useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import styled from 'styled-components';

const ScrollButton = () => {
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300)
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll');
    }
  }, [])
  
  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}/>
    </Button>
  );
}

export default ScrollButton;

const Button = styled.div`
  position: fixed;
  width: 100%;
  bottom: 4rem;
  left: 95vw;
  height: 1rem;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: rgb(20, 18, 81);
  @media (max-width: 768px) {
    left: 85vw;
  }
`
