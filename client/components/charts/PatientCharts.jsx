import { Box, Heading } from "@radix-ui/themes"
import { useState } from "react"
import Select from "@/components/forms/Select"
import GrowthChart from "./GrowthChart"
import { capitalize } from "../../util/string"
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
      name='chart_type'
      options={view_options}
      aria-label="Choose a Chart"
      placeholder='Choose a Chart'
      onValueChange={setView}
      size='2'
    />    
    {generic && generic[view] && <GrowthChart 
      title={`${capitalize(view)} vs Age`}
      xlabel='Age in Years'
      ylabel={`${capitalize(view)} in ${view == 'height' ? 'centimeters' : 'kilograms'}`}
      data={{
        patient: patient[view],
        generic: generic[view]
      }}
    />}
  </Box>
}

export default PatientCharts