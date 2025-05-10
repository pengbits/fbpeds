import {DayPicker} from "react-day-picker"
import "react-day-picker/style.css"
import { Box, Popover, Button } from "@radix-ui/themes"

export const DatePickerWithPopOver = ({date,onSelect}) => (
<Box mb='4'>
  <Popover.Root>
    <Popover.Trigger>
      <Button variant="soft">
        Select a Date
      </Button>
    </Popover.Trigger>
    <Popover.Content width="340px">
      <DayPicker
        mode="single"
        id="date"
        selected={date}
        onSelect={onSelect}>
      </DayPicker>
    </Popover.Content>
  </Popover.Root>
</Box>
)

export const DatePicker = ({date,onSelect}) => (
<Box mb='4'>
  <DayPicker
    mode="single"
    id="date"
    selected={date}
    onSelect={onSelect}>
  </DayPicker>
</Box>)

export default DatePicker