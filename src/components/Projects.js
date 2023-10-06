import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Agri Bot",
      description: "Machine Learning",
      imgUrl: "https://www.bairesdev.com/wp-content/uploads/2022/06/Picture6-1.svg",
    },
    {
      title: "Smart City",
      description: "Web Development",
      imgUrl: "https://logos-world.net/wp-content/uploads/2020/09/Linux-Logo-1996-present.png",
    },
    {
      title: "Smart Landmine Detector",
      description: "IOT",
      imgUrl: "https://www.definebusinessterms.com/wp-content/uploads/2021/11/Joomla-logo.png",
    },
    {
      title: "Smart Shopping Cart",
      description: "IoT",
      imgUrl: "https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png",
    },
    {
      title: "Agri Buddy",
      description: "Android Development",
      imgUrl: "https://i.pinimg.com/originals/a8/53/14/a8531424a5fac660e4261f72ca817141.png",
    },
    {
      title: "Decentralized medical Data sharing App",
      description: "Blockchain and Security",
      imgUrl: "https://image.pngaaa.com/508/2593508-middle.png",
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Open source projects are collaborative software initiatives where developers from around the world contribute and improve code openly. These projects encourage transparency, innovation, and community-driven development, fostering a vibrant ecosystem of shared knowledge and resources.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Open source projects are collaborative software initiatives where developers from around the world contribute and improve code openly. These projects encourage transparency, innovation, and community-driven development, fostering a vibrant ecosystem of shared knowledge and resources.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Open source projects are collaborative software initiatives where developers from around the world contribute and improve code openly. These projects encourage transparency, innovation, and community-driven development, fostering a vibrant ecosystem of shared knowledge and resources.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
