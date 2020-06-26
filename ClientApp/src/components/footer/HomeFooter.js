import React from 'react'
import { Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import svgFacebook from '../../assets/svgs/logo-facebook.svg';
import svgYoutube from '../../assets/svgs/logo-youtube.svg';

const HomeFooter = props => {
    
    const tagStyle = {
        lineHeight: '3rem',
    };

	return (
		<Row>
            <Col md="3" xs="6">
                Logo
            </Col>
            <Col md="3" xs="6">
                <div>Sự kiện giáo dục</div>
                <div style={tagStyle}>
                    <div style={{marginTop: '30px'}}>Blog</div>
                    <div>Ưu đãi thành viên</div>
                    <div>Thông tin</div>
                    <div>Liên hệ</div>
                </div>
            </Col>
            <Col md="3" xs="6">
                <div>
                    Nhập email để nhận các thông tin ưu đãi
                </div>
                <div style={{marginTop: '30px'}}>
                    <InputGroup className="mb-3">
                        <FormControl                       
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="light"> <i className="fa fa-paper-plane"></i></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </Col>
            <Col md="3" xs="6">
               <div>Liên hệ với chúng tôi</div>
               <div style={{marginTop: '30px'}}>
                    <img src={svgFacebook} className="mr-3" />
                    <img src={svgYoutube} />
                </div> 
            </Col>
        </Row>
	)
}

export default HomeFooter
