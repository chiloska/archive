import React from 'react';

import ImageDetail from './image_detail';



const ImageList = (props) => {
    const RederedImages = props.images.map((image) =>
        <ImageDetail key={image.id} image={image} />
    )


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {RederedImages}
                </div>
            </div>
        </div>
    );
};

export default ImageList;