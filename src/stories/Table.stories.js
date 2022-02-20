import Table from '../components/Table'

export default {
  title: 'Components/Table',
  component: Table
}

const Template = (args) => <Table {...args} />

export const DefaultTable = Template.bind({})
DefaultTable.args = {
  rows: 4
}
