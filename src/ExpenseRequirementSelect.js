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

function getStyles(name, requirements, theme) {
  return {
    fontWeight:
      requirements.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ExpenseRequirementSelect = ({ members, requirements, setRequirements }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setRequirements(event.target.value);
    console.log(requirements)
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setRequirements(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Choose friends</InputLabel>
        <Select
          form="expense-form"
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={requirements}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
                ))}
            </div>
          )}
          MenuProps={MenuProps}
          >
          {members.map((member) => (
            <MenuItem key={member.id} value={member.id} style={getStyles(name, requirements, theme)}>
              {member.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  )
}

const ExpenseRequirementSelectContainer = ({ value }) => {
//   const friends = useSelector(state => state.friendReducer.friends);
  const [ members, requirements, setRequirements ] = value;
  return (
    <ExpenseRequirementSelect members={members} requirements={requirements} setRequirements={setRequirements}/>
  )
}
export default ExpenseRequirementSelectContainer;
