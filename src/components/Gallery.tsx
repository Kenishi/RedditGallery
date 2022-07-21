import { Grid, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { GalleryItem } from "../models/GalleryItem"

export interface GalleryProps {
    items: GalleryItem[]
}

export const Gallery = (props: GalleryProps) => {

    // return (
    //     <Grid item lg={12}>
    //         <ImageList>
    //             { props.items.map((item) => {
    //                 return (
    //                     <ImageListItem key={item.thumbnail.toString()}>
    //                         <img src={`${item.thumbnail}`}/>
    //                         <ImageListItemBar>
    //                             <Grid item lg={3}>Test</Grid>
    //                             <Grid item lg={2}>Yes</Grid>
    //                         </ImageListItemBar>
    //                     </ImageListItem>
    //                 )
    //             })}
    //         </ImageList>
    //     </Grid>
    // );
}