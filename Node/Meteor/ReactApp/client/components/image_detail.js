import React from 'react';

const ImageDetail = (props) => {
    return (
        <div className="media list-group-item">
            <div className="media-left">
                <img className="image-responsive hidden-xs" src={props.image.urls.thumb} />
            </div>
            <div className="media-body">
                <h4 className="media-heading">{props.image.title}</h4>
                <p>{props.image.description}</p>
            </div>
        </div>
    );
};

export default ImageDetail;