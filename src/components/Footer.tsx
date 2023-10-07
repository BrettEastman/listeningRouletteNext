import Image from "next/image";
import styled from "styled-components";
import { inter } from "../app/fonts";
import githubIcon from "../public/icons/github-142-svgrepo-com.svg";
import instagramIcon from "../public/icons/instagram-svgrepo-com.svg";
import linkedInIcon from "../public/icons/linkedin-rounded-svgrepo-com.svg";

export default function Footer() {
  const copyright = document.getElementById("copyright");
  if (copyright) {
    copyright.innerHTML = `©${new Date().getFullYear()} Lost Lanes Publishing`;
  }

  return (
    <FooterWrapper>
      <p className={inter.className} id="copyright"></p>
      <p className={inter.className}>
        Designed and developed by Brett Austin Eastman: Next.js | Typescript |
        React | Styled-components
      </p>
      <Div>
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
      </Div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: hsl(358deg 49% 44% /0.3);
  font-size: 0.8rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 2rem;
`;

const Div = styled.div`
  display: flex;
  font-family: ${inter.className};
  flex-direction: row;
  gap: 1rem;
`;
