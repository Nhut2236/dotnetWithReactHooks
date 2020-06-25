import React, { useState, useEffect } from "react";
import BlogDetailsCarousel from '../components/carousel/BlogDetailsCarousel';
import ComingEventsCards from '../components/cards/ComingEventsCards';
import {INTRO_ITEMS} from '../constants/common';
import {Row, Col} from 'react-bootstrap';

const Home = () => {
  const introItems = INTRO_ITEMS;
  const fromQuery = { PageIndex: 1, PageSize: 3 }; 
  const [eventList, setEventList] = useState({});
  const [query, setQuery] = useState(fromQuery);
  const bannerStyle = {
    height: '300px'
  };
  const titleStyle = {
    fontWeight: '600',
    fontSize: '24px'
  };
  const sessionGrayStyle = {
    backgroundColor: '#FAFAFA',
    marginTop: '40px',
    marginBottom: '40px',
    padding: '40px'
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
    <div>
      <div style={bannerStyle} className="mt-3">
        <div className="container">
          <BlogDetailsCarousel />
        </div>
        <div className="container">
          <Row>
            { introItems && introItems.length ? introItems.map( (item, index) => (
                <Col md="4" key={index}>
                  <img src={item.image} />
                  <div className="mt-4" style={titleStyle}>{item.title}</div>
                  <div className="mt-4">{item.text}</div>
                </Col>
            )) : "" }
          </Row>
        </div>
        <section style={sessionGrayStyle} className="text-center">
          <div className="container">
              <div style={titleStyle}>Sự kiện sắp diễn ra</div>
              <div style={{ fontSize: '16px', marginTop: '16px' , marginBottom: '33px', maxWidth: '610px'}}>
                Những sự kiện này chia sẻ những ý tưởng mới, sáng tạo mới giúp trẻ phát triển về sức khỏe, khám phá tự nhiên, mỹ thuật, mối quan hệ xã hội và khả năng giao tiếp
              </div>
              <div className="mt-4">
              <Row>
                {eventList && eventList.Data && eventList.Data.length ? eventList.Data.map((event, index) =>  (
                  <Col md="4" key={index} className="text-center">
                    <ComingEventsCards data={event} />
                  </Col>
                ) ) : ""}
              </Row>          
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
