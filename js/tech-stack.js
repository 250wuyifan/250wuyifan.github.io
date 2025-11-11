// 技术栈可视化配置
const techStackConfig = {
  // 基于你的博客标签定义技术栈数据（使用更鲜明的颜色）
  data: [
    { name: 'Java安全', value: 0, color: '#e74c3c', icon: '☕' },
    { name: 'PHP安全', value: 0, color: '#8e44ad', icon: '🐘' },
    { name: 'JS逆向', value: 0, color: '#f39c12', icon: '📜' },
    { name: 'WEB安全', value: 0, color: '#c0392b', icon: '🌐' },
    { name: 'Windows Kernel', value: 0, color: '#2c3e50', icon: '🪟' },
    { name: '云安全', value: 0, color: '#3498db', icon: '☁️' },
    { name: '代码审计', value: 0, color: '#27ae60', icon: '🔍' },
    { name: '免杀', value: 0, color: '#34495e', icon: '🛡️' },
    { name: '安全开发', value: 0, color: '#16a085', icon: '💻' },
    { name: '恶意样本分析', value: 0, color: '#e67e22', icon: '🦠' }
  ],

  // 手动配置各技术栈的文章数量（根据实际情况调整）
                                                                                                                                  articleCounts: {
      'Java安全': 9,
      '恶意样本分析': 7,
      'JS逆向': 7,
      'PHP安全': 3,
      '免杀': 2,
      '安全开发': 1,
      '云安全': 1,
      'WEB安全': 1
  }
};

// 初始化技术栈图表
function initTechStackChart() {
  // 检查 ECharts 是否已加载
  if (typeof echarts === 'undefined') {
    console.warn('ECharts 未加载，等待重试...');
    setTimeout(initTechStackChart, 1000);
    return;
  }

  const container = document.getElementById('tech-stack-chart');
  if (!container) {
    console.warn('技术栈容器未找到');
    return;
  }

  // 更新数据
  techStackConfig.data.forEach(item => {
    item.value = techStackConfig.articleCounts[item.name] || 0;
  });

  const myChart = echarts.init(container);

  // 雷达图配置
  const radarOption = {
    title: {
      text: '技术栈分布',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `${params.name}<br/>文章数: ${params.value}`;
      }
    },
    radar: {
      indicator: techStackConfig.data.map(item => ({
        name: item.name,
        max: Math.max(...techStackConfig.data.map(d => d.value)) + 2
      })),
      radius: '65%',
      splitNumber: 5,
      name: {
        textStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(52, 73, 94, 0.4)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(52, 73, 94, 0.3)',
          width: 2
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(102, 126, 234, 0.08)', 'rgba(102, 126, 234, 0.15)']
        }
      }
    },
    series: [{
      name: '技术栈',
      type: 'radar',
      data: [{
        value: techStackConfig.data.map(item => item.value),
        name: '文章数量',
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: 'rgba(231, 76, 60, 0.6)' },
            { offset: 1, color: 'rgba(231, 76, 60, 0.2)' }
          ])
        },
        lineStyle: {
          width: 4,
          color: '#e74c3c'
        },
        itemStyle: {
          color: '#e74c3c',
          borderWidth: 3,
          borderColor: '#fff',
          shadowBlur: 8,
          shadowColor: 'rgba(231, 76, 60, 0.5)'
        }
      }]
    }]
  };

  // 饼图配置
  const pieOption = {
    title: {
      text: '技术栈分布',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>文章数: {c} ({d}%)',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      textStyle: {
        fontSize: 14
      }
    },
    legend: {
      orient: 'vertical',
      right: 15,
      top: 'center',
      icon: 'circle',
      itemWidth: 14,
      itemHeight: 14,
      itemGap: 15,
      textStyle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50'
      }
    },
    series: [{
      name: '技术栈',
      type: 'pie',
      radius: ['45%', '72%'],
      center: ['38%', '55%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 12,
        borderColor: '#fff',
        borderWidth: 3,
        shadowBlur: 8,
        shadowColor: 'rgba(0, 0, 0, 0.15)'
      },
      label: {
        show: true,
        formatter: '{b}\n{c} 篇',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2c3e50'
      },
      labelLine: {
        length: 20,
        length2: 15,
        lineStyle: {
          width: 2
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        scale: true,
        scaleSize: 10
      },
      data: techStackConfig.data.map(item => ({
        name: item.name,
        value: item.value,
        itemStyle: {
          color: item.color
        }
      }))
    }]
  };

  // 柱状图配置
  const barOption = {
    title: {
      text: '技术栈分布',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      formatter: '{b}<br/>文章数: {c} 篇',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 70,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: techStackConfig.data.map(item => item.name),
      axisLabel: {
        rotate: 25,
        fontSize: 13,
        fontWeight: '600',
        color: '#2c3e50'
      },
      axisLine: {
        lineStyle: {
          color: '#2c3e50',
          width: 2
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '文章数',
      minInterval: 1,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2c3e50'
      },
      axisLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2c3e50'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(52, 73, 94, 0.15)',
          width: 1
        }
      }
    },
    series: [{
      name: '文章数',
      type: 'bar',
      data: techStackConfig.data.map(item => ({
        value: item.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: item.color },
            { offset: 1, color: item.color + '99' }
          ]),
          borderRadius: [8, 8, 0, 0],
          shadowBlur: 5,
          shadowColor: item.color + '40'
        }
      })),
      barWidth: '55%',
      label: {
        show: true,
        position: 'top',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2c3e50'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.4)'
        }
      }
    }]
  };

  // 默认显示雷达图
  myChart.setOption(radarOption);

  // 响应式
  window.addEventListener('resize', function() {
    myChart.resize();
  });

  // 提供切换图表类型的功能
  window.switchChartType = function(type) {
    switch(type) {
      case 'radar':
        myChart.setOption(radarOption, true);
        break;
      case 'pie':
        myChart.setOption(pieOption, true);
        break;
      case 'bar':
        myChart.setOption(barOption, true);
        break;
    }
  };
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTechStackChart);
} else {
  initTechStackChart();
}

