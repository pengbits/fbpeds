import { Box, Heading, Select } from "@radix-ui/themes"
import { useState } from "react"
import GrowthChart from "./GrowthChart"

const PatientCharts = ({
  patient,
  generic
}) => {
  const [view, setView] = useState('height')
  return <Box>
    <Heading mb='2' size='3' as='h3'>Growth Chart for Patient</Heading>
    <Select.Root
      onValueChange={setView}>
      <Select.Trigger placeholder="Choose a Chart"/>
      <Select.Content>
			<Select.Item value="height">Height vs Age</Select.Item>
			<Select.Item value="weight">Weight vs Age</Select.Item>
      </Select.Content>
    </Select.Root>
    {generic && generic[view] && <GrowthChart 
      title={`${view} vs age`}
      data={{
        patient: patient[view],
        generic: generic[view]
      }}
    />}
  </Box>
}

export default PatientCharts