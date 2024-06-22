import { Card, CardContent, CardMedia, Typography, Button, CardActions, CardHeader, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={product.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${product.price}
        </Typography>
        <Rating value={product.rating} readOnly />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
