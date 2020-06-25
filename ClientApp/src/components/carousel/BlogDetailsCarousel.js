import React , { useState, useEffect } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import  { BANNER_ITEMS } from '../../constants/common';
import ImageRainbow from '../../assets/img/cloud-rainbow.svg';
const BlogDetailsCarousel = props => {
    const [ bannerItems, setBannerItems ] = useState(BANNER_ITEMS);
    
    const imgStyle = {
        width: '700px',
        height: 'auto'
    };

    const titleStyle = {
        marginTop: '20px',
        marginBottom: '30px',
        fontWeight: '600',
        fontSize: '88px',
        fontFamily: `'Playfair Display', sans-serif`
    };

    const borderBottomStyle = {
        borderBottom: '6px solid #FBAF2A',
    };

    return (
      <Carousel interval="2000">
        {bannerItems && bannerItems.length
          ? bannerItems.map((item, index) => (
              <Carousel.Item key={index}>
                <Row>
                  <Col md="4">
                    <div style={titleStyle}>
                      <Row>
                        <Col md="10" xs="9">
                          <span style={borderBottomStyle}>{item.title}</span>
                        </Col>
                        <Col md="2" xs="3">
                          <img src={ImageRainbow} />
                        </Col>
                      </Row>
                    </div>
                    <div className="text-justify">{item.text}</div>
                  </Col>
                  <Col md="8">
                    <img
                      className="d-block"
                      src={item.image}
                      alt={index}
                      style={imgStyle}
                    />
                  </Col>
                </Row>
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            ))
          : ""}
      </Carousel>
    );
}

export default  BlogDetailsCarousel;