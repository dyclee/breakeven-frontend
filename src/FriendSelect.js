import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

import ExpenseRequirementSelect from './ExpenseRequirementSelect';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, members, theme) {
  return {
    fontWeight:
      members.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const FriendSelect = ({friends,  members, setMembers }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setMembers(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setMembers(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} color="secondary" fullWidth>
        <InputLabel id="demo-mutiple-chip-label">Choose friends</InputLabel>
        <Select
          form="expense-form"
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={members}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.fullName} className={classes.chip} />
                ))}
            </div>
          )}
          MenuProps={MenuProps}
          >
          {friends.map((friend) => (
            <MenuItem key={friend.id} value={friend} style={getStyles(name, members, theme)}>
              {friend.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <ExpenseRequirementSelect value={[members, requirements, setRequirements ]}/> */}
    </div>
  )
}

const FriendSelectContainer = ({ value }) => {
  const friends = useSelector(state => state.friendReducer.friends);
  const [ members, setMembers ] = value;
  return (
    <FriendSelect
      friends={friends}
      members={members}
      setMembers={setMembers}s
    />
  )
}
export default FriendSelectContainer;
