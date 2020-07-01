import React, { useState, useEffect } from "react";
import BlogDetailsCarousel from '../components/carousel/BlogDetailsCarousel';
import ComingEventsCards from '../components/cards/ComingEventsCards';
import HomeFooter from '../components/footer/HomeFooter';
import {INTRO_ITEMS} from '../constants/common';
import {Row, Col, Button} from 'react-bootstrap';

const Home = () => {
  const introItems = INTRO_ITEMS;
  const fromQuery = { PageIndex: 1, PageSize: 3 }; 
  const [eventList, setEventList] = useState({});
  const [query, setQuery] = useState(fromQuery);
  const bannerStyle = {
    height: '300px'
  };
  const redirectTo = (path) => {
    window.location.href = path;
  }
  const titleStyle = {
    fontWeight: '600',
    fontSize: '24px'
  };

  const contentStyle = {
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  };

  const sessionGrayStyle = {
    backgroundColor: '#FAFAFA',
    marginTop: '40px',
    marginBottom: '40px',
    padding: '40px'
  };

  const sessionFooterStyle = {
    backgroundColor: '#333C45',
    marginTop: '80px',
    padding: '46px 170px 46px 170px',
    minHeight: '341px',
    color: 'white'
  };

  const getEventList = async () => {
    const apiPath = `/api/Event/GetAll`;
    const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(query),
      }).then(response => {
        response.json().then(data =>{
          setEventList(data.data);
        })
      });
  }

  useEffect(()=>{
    getEventList();
  },[]);

  return (
    <div style={{marginTop: '80px'}}>
      <div style={bannerStyle} className="mt-3">
        <div className="container">
          <BlogDetailsCarousel />
        </div>
        <div className="container">
          <Row>
            {introItems && introItems.length
              ? introItems.map((item, index) => (
                  <Col md="4" key={index}>
                    <img src={item.image} />
                    <div className="mt-4" style={titleStyle}>
                      {item.title}
                    </div>
                    <div className="mt-4">{item.text}</div>
                  </Col>
                ))
              : ""}
          </Row>
        </div>
        <section style={sessionGrayStyle} className="text-center">
          <div className="container">
            <div style={titleStyle}>Sự kiện sắp diễn ra</div>
            <div style={contentStyle}>
              <Row>
                <Col md={{ span: "8", offset: "2" }}>
                  Những sự kiện này chia sẻ những ý tưởng mới, sáng tạo mới giúp
                  trẻ phát triển về sức khỏe, khám phá tự nhiên, mỹ thuật, mối
                  quan hệ xã hội và khả năng giao tiếp
                </Col>
              </Row>
            </div>
            <div className="mt-4">
              <Row>
                {eventList && eventList.Data && eventList.Data.length
                  ? eventList.Data.map((event, index) => (
                      <Col md="4" key={index} className="text-center">
                        <ComingEventsCards data={event} />
                      </Col>
                    ))
                  : ""}
              </Row>
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button
                onClick={() => redirectTo("/blog")}
                style={{
                  background:
                    "transparent linear-gradient(233deg, #FBAF2A 0%, #F9D21B 100%) 0% 0% no-repeat",
                  padding: "15px 38px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600px",
                  border: "none",
                  outline: "none",
                }}
              >
                Tải thêm
              </Button>
            </div>
          </div>
        </section>
        <section style={sessionFooterStyle}>
          <div className="container">
            <HomeFooter />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
