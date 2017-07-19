import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './FixedButton.css';

const FixedButton = (options) => {
  return (
    <Button circular color='orange' icon='location arrow' style={styles} {...options} />
  );
}

export default FixedButton
