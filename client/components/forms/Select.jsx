import { Select } from "@radix-ui/themes"
export default ({
    options, 
    initialAttrs, 
    name, 
    placeholder,
    onValueChange
  }) => {
    console.log(options)
  return (<Select.Root name={name} size="3" {...initialAttrs}
    onValueChange={onValueChange}>
    <Select.Trigger placeholder={placeholder} />
    <Select.Content>
      {options.map(c => (
        <Select.Item key={c.id} value={c.id}> {c.name}</Select.Item>
      ))}
    </Select.Content>
  </Select.Root>)
}