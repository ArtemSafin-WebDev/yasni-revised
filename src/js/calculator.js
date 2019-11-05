import { debounce } from 'lodash';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

const elements = {
    inputs: Array.from(document.querySelectorAll(':scope .js-compare-form input')),
    profitChart: document.querySelector('#profit-chart'),
    taxChart: document.querySelector('#tax-chart')
};

const profitChartOptions = {
    type: 'bar',
    data: {
        labels: ['Прибыль без ТОСЭР', 'Прибыль в ТОСЭР'],
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


const taxChartOptions = {
    type: 'bar',
    data: {
        labels: ['Налог без ТОСЭР', 'Налог в ТОСЭР'],
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
        this.profitChartInstance = null;
        this.state = {
            expense: 0,
            median_wage: 0,
            personel: 0,
            real_estate: 0,
            revenue: 0
        };
        Chart.defaults.global.defaultFontFamily = "'Segoe UI', 'sans-serif'";
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
            
            const { value, name } = input;
            this.setState({
                [name]: value.trim() === '' ? 0 : parseInt(value, 10)
            });
        });
        this.drawProfitChart();
        this.plotProfitChartData();
        this.drawTaxChart();
        this.plotTaxChartData();
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

    plotProfitChartData() {
        const { profitBefore, profitAfter } = this.calculateStats();

        this.profitChartInstance.data.datasets = [];
        this.profitChartInstance.data.datasets.push(this.getDataSet(profitBefore / 1000, profitAfter / 1000));
        this.profitChartInstance.update();
    }


    plotTaxChartData() {
        const { taxBefore, taxAfter } = this.calculateStats();

        this.taxChartInstance.data.datasets = [];
        this.taxChartInstance.data.datasets.push(this.getDataSet(taxBefore / 1000, taxAfter / 1000));
        this.taxChartInstance.update();
    }

    drawProfitChart() {
        const { profitChart } = this.elements;
        const ctx = profitChart.getContext('2d');
       
        this.profitChartInstance = new Chart(ctx, profitChartOptions);
    }

    drawTaxChart() {
        const { taxChart } = this.elements;
        const ctx = taxChart.getContext('2d');
       
        this.taxChartInstance = new Chart(ctx, taxChartOptions);
    }

    handleInput = debounce(event => {
        
        const { value, name } = event.target;
        this.setState({
            [name]: value.trim() === '' ? 0 : parseInt(value, 10)
        });

        this.plotProfitChartData();
        this.plotTaxChartData();
        
    }, 1500);


    handleSubmit = () => {
        const { inputs } = this.elements;
        inputs.forEach(input => {
            
            const { value, name } = input;
            this.setState({
                [name]: value.trim() === '' ? 0 : parseInt(value, 10)
            });
        });
        
        this.plotProfitChartData();
        this.plotTaxChartData();
    }

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
