import React , { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import NoImage from '../../assets/svgs/no-image.svg';

const ComingEventsCards = props => {
  const [event, setEvent] = useState(props.data);
    return (
      <div>
        <Card style={{ width: "19rem", height: '488px', borderRadius: '10px' }}>
        {event && event.Avatar ? <Card.Img variant="top" src={event.Avatar} style={{ height: '190px !important'}} /> : <Card.Img variant="top" src={NoImage} style={{ height: '190px'}}/>}        
          <Card.Body style={{ textAlign: "justify" }}>
            <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>{event.Title}</div>
            <div style={{ fontSize: '16px'  }}>{event.Description}</div>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    );
};

export default  ComingEventsCards;