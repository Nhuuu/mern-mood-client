
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SERVER_URL from '../constants/server';
import Weather from './Weather';
import Food from './Food';
import Movie from './Movie';
import Output from './Output'
import axios from 'axios';
import Loader from 'react-loader-spinner' 
import Restaurant from './Restaurant';
import Giphy from './Giphy';


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = (props, { mobile }) => (
  <Container text>
    <Header
      as='h1'
      content={ props.saying[2] }
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='You made it this far, you can do it!'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Let's Git it! (stretchgoals)
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
  
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {   
    rainSaying: '',
    snowSaying: '',
    weather: '',
    weatherTemp: ''
}
componentDidMount(){
  this.getSayingNorm()
  this.getWeather()
}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  getSayingNorm = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/result/saying', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(json => {
      console.log('THESE ARE THE SAYING NORM', json)
      const rainSaying = json.data[0].output.rain.map((obj, i) => {
        return obj.output;
      })
      const snowSaying = json.data[0].output.snow.map((obj, i) => {
        return obj.output
      })
      this.setState({
        rainSaying: rainSaying,
        snowSaying: snowSaying
      })
    })
    .catch(error => {
      console.log('ERROR RETRIEVING NORM SAYING', error) 
    })
  }

  getWeather = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/weather', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(json => {
      console.log("weather got", json);
      const currWeather=json.data.currently;
      this.setState({ weather: currWeather})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              {/* <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container> */}
            </Menu>
            <HomepageHeading 
            saying={this.state.rainSaying}
            saying={this.state.rainSaying} 
            summary={this.state.weather.summary} 
            temp={this.state.weather.temperature} 
            cssClass={this.state.weather.icon}/>

          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {   
    rainSaying: '',
    snowSaying: '',
    weather: '',
    weatherTemp: ''
}
componentDidMount(){
  this.getSayingNorm()
  this.getWeather()
}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  getSayingNorm = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/result/saying', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(json => {
      console.log('THESE ARE THE SAYING NORM', json)
      const rainSaying = json.data[0].output.rain.map((obj, i) => {
        return obj.output;
      })
      const snowSaying = json.data[0].output.snow.map((obj, i) => {
        return obj.output
      })
      this.setState({
        rainSaying: rainSaying,
        snowSaying: snowSaying
      })
    })
    .catch(error => {
      console.log('ERROR RETRIEVING NORM SAYING', error) 
    })
  }

  getWeather = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/weather', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(json => {
      console.log("weather got", json);
      const currWeather=json.data.currently;
      this.setState({ weather: currWeather})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >


            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile 
            saying={this.state.rainSaying} 
            summary={this.state.weather.summary} 
            temp={this.state.weather.temperature} 
            cssClass={this.state.weather.icon}/>


          {children}

      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


class Newresult extends Component {
  constructor(){
    super()
    this.state = {
      yelp: [],
      film: '',
      // food: [],
      address:[],
      phone: [],
      rating: [],
      // poster: [],
      isLoading: true,
      weather: '',
      weatherTemp: ''

    }
  }

  componentDidMount(){
    this.getFilms()
    this.getFood()
    this.getGiphy()
    this.getWeather()

    // this.setState({isLoading: false}) // This is used for acutal loader usage:
    setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
  }

  getFilms = () => {
    fetch(`https://api.themoviedb.org/3/genre/35/movies?api_key=b1b4d1f42d4ead1ab1d5fb013cb9340d`)
    .then(response => response.json())
    .then(json=> {
      console.log('films got')
      const filmObj = json.results.sort(function() { return 0.5 - Math.random() });
      this.setState({
        film: filmObj[0]
      })
    })
    .catch(error => {
      console.log("Error:", error)
    })
  }
  
  getWeather = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/weather', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(json => {
      console.log("weather got", json);
      const currWeather=json.data.currently;
      this.setState({ weather: currWeather})
    })
    .catch(err => {
      console.log(err)
    })
  }

  getFood = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/restaurant', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      const shuffledData = response.data.sort(function() { return 0.5 - Math.random() });
      const restaurantList = shuffledData.map((obj, i) => {
        return obj.name;
      })
      const restaurantAddress = shuffledData.map((obj, i) => {
        return obj.location.display_address;
      })
      const restRate = shuffledData.map((obj, i) => {
        return obj.rating;
      })
      const restPhone = shuffledData.map((obj, i) => {
        return obj.phone;
      })
      const restaurantImg = shuffledData.map((obj, i) => {
        return obj.image_url;
      })
        console.log(shuffledData[0])
      this.setState({ 
        yelp: shuffledData[0],
        // food: restaurantList[0],
        // poster: restaurantImg[0],
        address: restaurantAddress[0],
        rating: restRate[0],
        phone: restPhone[0]
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  getGiphy = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL + '/result/giphy/'+this.state.weather.summary, {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(response => {
      console.log("giphy got",response)
      const giphyList = response.data.data.sort(function() { return 0.5 - Math.random() });
      const giphyItem = giphyList.map((obj, i) => {
        return obj;
      })
      this.setState({ 
        giphy: giphyItem[0].images.original.url
      })
    })
    .catch(error => {
      console.log(error)
    })
  .catch(err => {
    console.log(err)
  })
}

  
  
  
  render() {
    if(this.state.isLoading){
      return(
        <div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
      )
    }
    if(this.props.user){
      return(
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Individuals lighten their mood
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Nothing too serious, we will continue to evolve to ensure your can refresh your mood with a click!
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Gify of the day
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes, our developers pulled gify directly from your current weather condition of where you're sitting right now, so epic! right! right?! no? Hmm yeah, the results are hit or miss but we appreciate the thought.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          <Image bordered rounded size='large' src={this.state.giphy} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Gif Search options (strech goals)</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header content='center' as='h3' style={{ fontSize: '2em' }}>Current Temperature is {this.state.weather.temperature} ℉
            </Header>
            <p style={{ fontSize: '1.33em' }}>Current condition outside is {this.state.weather.summary}.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='div' style={{ padding: '0 40% 0' }}>
            <div className={'results-weather-icon-' + this.state.weather.icon}></div>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    {/* stretch goals */}
    {/* <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment> */}
     <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
             We all got to eat right!? 
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              I hate having to decide where to eat what... so our developers have once again combined their God given talents and provided you with a solution!
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
               {this.state.yelp.name}
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Rating:{this.state.rating} ⭐</p>
            <p style={{ fontSize: '1.33em' }}>
            ☎️{this.state.phone}   </p>
            <p style={{ fontSize: '1.33em' }}>
            📌{this.state.address} </p>
         
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          <Image bordered rounded size='large' src={this.state.yelp.image_url} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Gif Search options (strech goals)</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
             One more, Latest movie out now based on your overall mood results.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Complex algorithm developed to provide you the movie result from your mood inputs and increase your mental health ...don't look into our code, just trust us :) 
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
            {this.state.film.original_title}
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            (Rating:{this.state.film.vote_average}⭐)</p>
            <p style={{ fontSize: '1.33em' }}>
           Synopsis: 
           {this.state.film.overview}</p>
         
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          <Image bordered rounded size='large' src={`https://image.tmdb.org/t/p/w500/${this.state.film.poster_path}`} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Gif Search options (strech goals)</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About - Strech Goals' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Freelance Work</List.Item>
                <List.Item as='a'>Feedback</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Technology Used' />
              <List link inverted>
                <List.Item as='a'>React</List.Item>
                <List.Item as='a'>React Materialize/React Semantic</List.Item>
                <List.Item as='a'>Express</List.Item>
                <List.Item as='a'>MongoDB</List.Item>
                <List.Item as='a'>Mongoose</List.Item>
                <List.Item as='a'>Axios</List.Item>
                <List.Item as='a'>Node</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                SEI22 - Software Engineering Emmersive
              </Header>
              <p>
              Created with Love by Doug Klemp, Kelly Park, Nhu Trinh, and Paolo Chidrome &copy; {new Date().getFullYear()}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
      );
    }
  return (
    <div>
        <p><Link to="/login">Log In</Link> or <Link to="/signup">Sign up</Link> to get started!</p>
    </div>
  )
  }
}
export default Newresult
