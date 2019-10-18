import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

export const Container = ({ children }) => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Lora:700|Merriweather:400,400i&amp;subset=cyrillic"
        rel="stylesheet"
      />
    </Helmet>
    <Article>{children}</Article>
  </>
);

export const Header = styled.header`
  font-family: 'Lora', serif;
`;

export const Article = styled.article`
  max-width: 720px;
  margin: 0 auto;
`;

export const Paragraph = styled.div`
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const ParagraphTitle = styled.h3`
  font-family: 'Lora', serif;
  font-size: 1.17em;
  font-weight: bold;
`;

export const ParagraphTitleWithCounter = styled(ParagraphTitle)`
  counter-increment: chapter;
  position: relative;
  &::before {
    content: counter(chapter) '. ';
    position: absolute;
    left: 0;
  }
`;

export const AdditionalInfo = styled.div`
  color: gray;
  font-size: 0.75em;
`;

export const Reference = styled(AdditionalInfo)`
  height: 0;
  text-align: right;
  & > a {
    margin-right: 4px;
  }
`;

const StyledBlockTitle = styled.h4`
  background-color: #fff;
  display: inline-block;
  margin: 12px 12px 0 28px;
  padding: 0 2px;
  position: relative;
  top: 12px;
`;

const StyledBlockBody = styled.blockquote`
  border-radius: 2px;
  border: 1px solid #212121;
  margin: 0 auto;
  padding: 16px 8px 8px 28px;
`;

const nodeOrStringPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
]);

const Block = ({ children, title }) => (
  <Paragraph>
    <StyledBlockTitle>{title}</StyledBlockTitle>
    <StyledBlockBody>{children}</StyledBlockBody>
  </Paragraph>
);
Block.propTypes = {
  children: nodeOrStringPropType.isRequired,
  title: nodeOrStringPropType.isRequired,
};

export const Quote = ({ children }) => (
  <Block title="Цитата">
    <em>{children}</em>
  </Block>
);
Quote.propTypes = {
  children: nodeOrStringPropType.isRequired,
};

export const Guidance = ({ children }) => (
  <Block title="Действие">{children}</Block>
);
Guidance.propTypes = {
  children: nodeOrStringPropType.isRequired,
};

export const Example = ({ children, description }) => (
  <Block title={description ? `Пример: ${description}` : 'Пример'}>
    {children}
  </Block>
);
Example.propTypes = {
  description: PropTypes.string,
  children: nodeOrStringPropType.isRequired,
};
Example.defaultProps = {
  description: '',
};

export const Footnote = ({ children }) => (
  <Block title="Примечание">{children}</Block>
);
Footnote.propTypes = {
  children: nodeOrStringPropType.isRequired,
};

export const ChaptersList = styled.ol`
  margin: 36px 0 0;
  padding: 0;
  list-style: none;
  counter-reset: chapter;
`;

export const Chapter = styled.li`
  margin-bottom: 72px;
  ${ParagraphTitle}, ${ParagraphTitleWithCounter} {
    padding-left: 24px;
  }
  ${Paragraph} {
    padding-left: 24px;
  }
`;

export const ChapterWithCounter = styled(Chapter)`
  counter-increment: chapter;
  position: relative;
  &::before {
    content: counter(chapter) '. ';
    position: absolute;
    left: 0;
    font-family: 'Lora', serif;
    font-size: 1.17em;
    font-weight: bold;
  }
`;

export const Clause = styled.li`
  margin-bottom: 12px;
`;

export const OrderedList = styled.ol``;

export const UnorderedList = styled.ul`
  list-style-type: none;
  margin-right: 0;
  padding: 0;
  ${Clause} {
    :before {
      content: '–';
      margin-right: 4px;
    }
  }
`;

export const Small = styled.p`
  font-size: 0.8em;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`;
const VideoContent = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const YoutubeVideo = ({ youtubeId }) => (
  <VideoContainer>
    <VideoContent
      src={`https://www.youtube.com/embed/${youtubeId}`}
      frameBorder="0"
    />
  </VideoContainer>
);
