import { debounce } from 'lodash';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

const elements = {
    inputs: Array.from(document.querySelectorAll(':scope .js-compare-form input')),
    profitChart: document.querySelector('#profit-chart')
};

const chartOptions = {
    type: 'bar',
    data: {
        labels: ['Прибыль без ТОСЭР', 'Налог в ТОСЭР'],
        datasets: []
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [
                {
                    display: false
                }
            ],

            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
};

class ComparisonController {
    constructor(elements) {
        this.elements = elements;
        this.checkElements();
        this.chartInstance = null;
        this.state = {
            expense: 0,
            median_wage: 0,
            personel: 0,
            real_estate: 0,
            revenue: 0
        };

        this.setInitialState();
        this.addListeners();
    }

    checkElements() {
        for (const elementKey of Object.keys(this.elements)) {
            const element = this.elements[elementKey];
            if (!element) {
                throw new Error(`Element ${elementKey} is not present`);
            }
            if (Array.isArray(element) && element.length === 0) {
                throw new Error(`Element ${elementKey} is an empty array`);
            }
        }
    }

    getDataSet(a, b) {
        return {
            label: 'Рассчет показателей',
            data: [a, b],
            barPercentage: 0.4,
            backgroundColor: ['rgba(33, 89, 146, 1)', 'rgba(67, 203, 131, 1)', 'rgba(33, 89, 146, 1)', 'rgba(67, 203, 131, 1)'],
            borderColor: ['rgba(33, 89, 146, 1)', 'rgba(67, 203, 131, 1)', 'rgba(33, 89, 146, 1)', 'rgba(67, 203, 131, 1)'],
            borderWidth: 1
        };
    }

    setState = newState => {
        const oldState = this.state;
        this.state = {
            ...oldState,
            ...newState
        };
    };

    setInitialState() {
        const { inputs } = this.elements;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.value = 0;
            }
            const { value, name } = input;
            this.setState({
                [name]: parseInt(value, 10)
            });
        });
        this.drawProfitChart();
        this.plotChartData();
    }

    calculateStats() {
        const standardTaxes = {
            realEstateTax: 0.022,
            socialTax: 0.302,
            profitTax: 0.2
        };

        const TOSERTaxes = {
            realEstateTax: 0,
            socialTax: 0.08,
            profitTax: 0.03
        };

        const profitBeforeTax = this.state.revenue - this.state.expense;
        const taxBefore = this.state.real_estate * standardTaxes.realEstateTax + profitBeforeTax * standardTaxes.profitTax + this.state.median_wage * this.state.personel * standardTaxes.socialTax;
        const taxAfter = this.state.real_estate * TOSERTaxes.realEstateTax + profitBeforeTax * TOSERTaxes.profitTax + this.state.median_wage * this.state.personel * TOSERTaxes.socialTax;
        const profitBefore = profitBeforeTax - taxBefore;
        const profitAfter = profitBeforeTax - taxAfter;

        return {
            taxBefore,
            taxAfter,
            profitBefore,
            profitAfter
        };
    }

    plotChartData() {
        const { profitBefore, taxAfter } = this.calculateStats();

        this.chartInstance.data.datasets = [];
        this.chartInstance.data.datasets.push(this.getDataSet(profitBefore / 1000, taxAfter / 1000));
        this.chartInstance.update();
    }

    drawProfitChart() {
        const { profitChart } = this.elements;
        const ctx = profitChart.getContext('2d');
        Chart.defaults.global.defaultFontFamily = "'Segoe UI', 'sans-serif'";
        this.chartInstance = new Chart(ctx, chartOptions);
    }

    handleInput = debounce(event => {
        if (event.target.value.trim() === '') {
            event.target.value = 0;
        } else {
            event.target.value = parseInt(event.target.value, 10);
        }

        const { value, name } = event.target;
        this.setState({
            [name]: parseInt(value, 10)
        });

        this.plotChartData();
        
    }, 1500);

    addListeners() {
        const { inputs } = this.elements;

        inputs.forEach(input => {
            input.addEventListener('input', event => {
                this.handleInput(event);
            });
        });
    }
}

export default function() {
    new ComparisonController(elements);
}
