import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import CardControl from '../CardControl';
import CardControlsWrapper from '../CardControlsWrapper';
import InfiniteLoadingIndicator from '../InfiniteLoadingIndicator';

const RowItem = ({
  file,
  fileInfo,
  hasError,
  errorMessage,
  isDownloading,
  isUploading,
  onClick,
  onClickDeleteFileToUpload,
  onClickEdit,
  originalIndex,
}) => {
  const url = file ? URL.createObjectURL(file) : null;

  const handleClick = () => {
    onClick(originalIndex);
  };

  const handleClickDelete = () => {
    onClickDeleteFileToUpload(originalIndex);
  };

  const handleClickEdit = () => {
    onClickEdit(originalIndex);
  };

  return (
    <div className="col-xs-12 col-md-6 col-xl-3" key={originalIndex}>
      <Card
        small
        errorMessage={errorMessage}
        hasError={hasError}
        hasIcon
        type={file ? file.type : null}
        size={file ? file.size : null}
        url={url}
        {...fileInfo}
        withFileCaching={false}
        withoutFileInfo={isDownloading || (file === null && hasError)}
      >
        {(isUploading || isDownloading) && <InfiniteLoadingIndicator onClick={handleClick} />}
        {!isUploading && !isDownloading && (
          <CardControlsWrapper className="card-control-wrapper">
            <CardControl onClick={handleClickDelete} type="trash-alt" small />
            <CardControl onClick={handleClickEdit} small />
          </CardControlsWrapper>
        )}
      </Card>
    </div>
  );
};

RowItem.defaultProps = {
  file: null,
  errorMessage: null,
  isDownloading: false,
};

RowItem.propTypes = {
  file: PropTypes.object,
  fileInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  hasError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isDownloading: PropTypes.bool,
  isUploading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickDeleteFileToUpload: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  originalIndex: PropTypes.number.isRequired,
};

export default RowItem;
