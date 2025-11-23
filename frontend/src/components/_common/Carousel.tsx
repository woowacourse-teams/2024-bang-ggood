import useMouseDrag from "@/hooks/useMouseDrag";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

export const Carousel = ({images}:{images:string[]}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = images.length ;
  
    const mod = (n:number, m:number) => (n % m + m) % m;
    useMouseDrag(scrollRef, (start, end) => {
      if (end.x - start.x > 100) {
        setCurrentIndex(mod(currentIndex - 1,maxIndex));
      } else if (start.x - end.x > 100) {
        setCurrentIndex(mod(currentIndex + 1,maxIndex));
      }
    });
  
  
    return (
      <SC.Wrapper ref={scrollRef} >
        <SC.ScrollBox >
          {[...images].map(image => (
            <SC.Slide key={image}>
              <img src={image} draggable={false}   alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  
            </SC.Slide>
          ))}
        </SC.ScrollBox>
  
        <SC.DotContainer>
          {[...images].map((_, idx) => (
            <SC.Dot key={idx} active={idx === currentIndex} />
          ))}
        </SC.DotContainer>
      </SC.Wrapper>
    );
  };
  
  
  const SC = {
    Wrapper: styled.section`
      display: flex;
      position: relative;
      width: 100%;
      flex-direction: column;
      align-items: center;
    `,
  
    ScrollBox: styled.div`
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      scroll-behavior: smooth;
  
      &::-webkit-scrollbar {
        display: none;
      }
    `,
    Slide: styled.div`
      flex-shrink: 0;
      scroll-snap-align: start;
      width: 100%;
      min-width: 100%;
      height: 313px;
    `,
    DotContainer: styled.div`
      display: flex;
      position: absolute;
      bottom: 10px;
      margin-top: 1rem;
      gap: 0.5rem;
    `,
    Dot: styled.div<{ active: boolean }>`
      width: 8px;
      height: 8px;
      border-radius: 50%;
  
      background-color: ${({ active, theme }) => (active ? theme.color.gray[500] : theme.color.gray[100])};
      transition: background-color 0.3s;
    `,
  };
  
  