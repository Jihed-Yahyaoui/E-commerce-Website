import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

export default function ProductCard(item) {
  const location = useLocation();
  const link = `./${location.pathname.split("/")[1]}/${item._id}`
  
  return (
    <Card elevation={0} sx={{ minWidth: "100px"}}>
      <CardActionArea href={link} sx={{position: "static"}}>
        <Box margin="auto" width="fit-content ">
          <CardMedia
            component="img"
            image="https://via.placeholder.com/150"
            sx={{ maxWidth: "150px", height: "auto" }}
          ></CardMedia>
        </Box>
        <CardContent sx={{paddingBottom: "50px"}}>
          <Typography variant="button">
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            fontFamily={"Arial"}
            bottom="0px"
            position="absolute"
          >
            {`${item.price}.990 DT`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
