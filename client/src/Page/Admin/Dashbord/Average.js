import React from 'react'

function Average() {
  return (
<>
<div class="bg-white rounded-lg shadow-lg p-6">
  <h2 class="text-xl font-medium mb-4">Dashboard Overview</h2>
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-green-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Total Customers</h3>
      <p class="text-4xl font-bold">500</p>
    </div>
    <div class="bg-blue-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Today's Water Usage</h3>
      <p class="text-4xl font-bold">10,000</p>
    </div>
    <div class="bg-yellow-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Total Pending Amount</h3>
      <p class="text-4xl font-bold">$5,000</p>
    </div>
  </div>
</div>


</>

  )
}

export default Average