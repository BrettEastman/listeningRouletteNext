import Image from "next/image";
import styled from "styled-components";
import { inter } from "../app/fonts";
import { Paragraph } from "../app/styles";
import githubIcon from "../public/icons/github-142-svgrepo-com.svg";
import instagramIcon from "../public/icons/instagram-svgrepo-com.svg";
import linkedInIcon from "../public/icons/linkedin-rounded-svgrepo-com.svg";

export default function Footer() {
  return (
    <StyledFooter>
      <Icons>
        <a
          className={inter.className}
          rel="noreferrer"
          target="_blank"
          href="https://github.com/BrettEastman/listeningRouletteNext"
        >
          View source code
        </a>
        <a href="https://github.com/BrettEastman">
          <Image
            src={githubIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
        <a href="https://www.linkedin.com/in/brett-austin-eastman/">
          <Image
            src={linkedInIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
        <a href="https://www.instagram.com/brettaustineastman/">
          <Image
            src={instagramIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
      </Icons>
      <Paragraph className={inter.className} size="0.8rem">
        Designed and developed by Brett Austin Eastman: Next.js | Typescript |
        React | Styled-components
      </Paragraph>
      <Paragraph
        className={inter.className}
        size="0.8rem"
      >{`©${new Date().getFullYear()} Lost Lanes Publishing`}</Paragraph>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #a7393d;
  font-size: 0.8rem;
`;

const Icons = styled.div`
  display: flex;
  font-family: ${inter.className};
  flex-direction: row;
  gap: 1rem;
`;
