import React from "react";
import {Modal,Typography,Button,ButtonGroup,Grid,Box,CircularProgress,useMediaQuery,Rating} from "@mui/material"
import {Movie as MovieIcon, Theaters, Language,PlusOne,Favorite, FavoriteBorderOutlined,Remove,ArrowBack} from "@mui/icons-material"
import {Link,useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux";
import axios from "axios"
import {useGetMovieQuery} from "../../services/TMDB"
import useStyles from "./styles"

const MovieInformation = () => {
  const {id} =useParams();
  const {data,isFetching,error}=useGetMovieQuery(id);
  
  const classes= useStyles();
  
  if(isFetching){
    return(<Box display="flex" justifyContent="center" alignItems="center">
    <CircularProgress size="8rem"/>
    </Box>)
  }
  
  console.log(error)
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/" >Something has gone wrong... - Go Back</Link>
      </Box>
    );
  }

  return <Grid container className={classes.containerSpaceAround}>
    <Grid item sm={12} lg={4}>
      <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} className={classes.poster} alt={data?.title} />
    </Grid>
    <Grid item container direction="column" lg={7}>
      <Grid>
      <Typography variant="h3" align="center" gutterBottom>{data?.title} {+(data.release_date.split("-")[0])}</Typography>
      <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
      </Grid>
      <Grid item className={classes.containerSpaceAround}>
        <Box display="flex">
          <Rating readOnly value={data?.vote_average/2}></Rating>
        </Box>
      </Grid>
    </Grid>
  </Grid>;
};

export default MovieInformation;
