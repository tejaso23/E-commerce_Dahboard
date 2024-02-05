import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';/*must include it */


const ProductChart = ({ products, onProductClick }) => {
  const chartData = {
    labels: products.map(product => product.name),
    datasets: [{
      label: 'Product Details',
      data: products.map(product => product.price),
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Explicitly specify category scale for x-axis
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedProduct = products[elements[0].index];
        onProductClick(clickedProduct);
      }
    },
  };

  return (
    <div className="chart-section">
      <h2>Products Chart</h2>
      {products.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>No products available by this User</p>
      )}
    </div>
  );
};

export default ProductChart;
