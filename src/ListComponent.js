import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from './styles';

const ListComponent = ({ suggestions, selectAddress, classes }) => {
    return (
        <Paper className={classes.paper}>
        {
          suggestions.map((s) => {
            return (
              <MenuItem key={s.id} onClick={selectAddress} id={s.id} className={classes.suggestions}>
              {s.value}
              </MenuItem>
            )
          })
        }
        </Paper>
    )
}

ListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListComponent);