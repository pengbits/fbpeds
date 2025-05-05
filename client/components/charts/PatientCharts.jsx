import { Box, Heading } from "@radix-ui/themes"
import { useState } from "react"
import Select from "@/components/forms/Select"
import GrowthChart from "./GrowthChart"
const view_options = [{
  label:'Height vs Age',
  value: 'height',
},{
  label:'Weight vs Age',
  value: 'weight',
}]
const PatientCharts = ({
  patient,
  generic
}) => {
  const [view, setView] = useState('height')
  return <Box>
    <Heading mb='2' size='3' as='h3'>Growth Chart for Patient</Heading>
    <Select
      options={view_options}
      name='chart_type'
      aria-label="Choose a Chart"
      placeholder='Choose a Chart'
      size='2'
      onValueChange={setView}
    />    
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