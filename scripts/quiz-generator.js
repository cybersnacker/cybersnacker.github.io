// Hybrid Role Self-Assessment Quiz Generator
// This script dynamically generates the entire quiz interface client-side

const QuizGenerator = {
    sections: ['technical', 'research', 'product', 'data', 'communication', 'leadership'],
    answers: {},
    currentSection: 0,
    chart: null,

    // Quiz data structure
    quizData: {
        technical: {
            title: '💻 Technical Execution',
            description: 'Your ability to build, ship, and maintain systems',
            question: 'Select all that describe your technical execution capabilities:',
            options: [
                { value: 3, text: 'I own end-to-end systems, from development to production to monitoring' },
                { value: 1, text: 'I write code and scripts to solve specific problems and build features' },
                { value: 5, text: 'I create novel technical solutions and frameworks used across teams/organizations' },
                { value: 2, text: 'I design systems and make technical decisions that balance tradeoffs' },
                { value: 4, text: 'I build systems that handle complexity, scale, and evolving requirements' }
            ],
            labels: ['Implements', 'Architects', 'Owns', 'Scales', 'Innovates'],
            descriptions: [
                'Writes code and scripts to solve specific problems and build features',
                'Designs systems and makes technical decisions that balance tradeoffs',
                'Owns end-to-end systems, from development to production to monitoring',
                'Builds systems that handle complexity, scale, and evolving requirements',
                'Creates novel technical solutions and frameworks used across teams/organizations'
            ]
        },
        research: {
            title: '🔬 Research & Analysis',
            description: 'Your depth in investigation, experimentation, and insight generation',
            question: 'Select all that describe your research and analytical capabilities:',
            options: [
                { value: 4, text: 'I push the boundaries of what\'s known, creating new methods or frameworks' },
                { value: 2, text: 'I design and run experiments to test hypotheses and validate assumptions' },
                { value: 1, text: 'I investigate problems, read papers, and gather information to understand domains' },
                { value: 5, text: 'I establish new research directions and my work influences the broader field' },
                { value: 3, text: 'I connect insights across domains and generate novel perspectives on problems' }
            ],
            labels: ['Explores', 'Experiments', 'Synthesizes', 'Advances', 'Pioneers'],
            descriptions: [
                'Investigates problems, reads papers, and gathers information to understand domains',
                'Designs and runs experiments to test hypotheses and validate assumptions',
                'Connects insights across domains and generates novel perspectives on problems',
                'Pushes the boundaries of what\'s known, creating new methods or frameworks',
                'Establishes new research directions and influences the broader field'
            ]
        },
        product: {
            title: '🎯 Product Thinking',
            description: 'Your understanding of user needs, strategy, and value creation',
            question: 'Select all that describe your product thinking and strategic capabilities:',
            options: [
                { value: 2, text: 'I suggest improvements and help shape features based on user feedback' },
                { value: 5, text: 'I set organizational product direction and create new markets or categories' },
                { value: 3, text: 'I identify opportunities, define solutions, and drive product decisions' },
                { value: 1, text: 'I build what\'s specified and understand how features serve user needs' },
                { value: 4, text: 'I develop product strategy, roadmaps, and align teams around vision' }
            ],
            labels: ['Executes', 'Contributes', 'Shapes', 'Strategizes', 'Defines'],
            descriptions: [
                'Builds what\'s specified and understands how features serve user needs',
                'Suggests improvements and helps shape features based on user feedback',
                'Identifies opportunities, defines solutions, and drives product decisions',
                'Develops product strategy, roadmaps, and aligns teams around vision',
                'Sets organizational product direction and creates new markets or categories'
            ]
        },
        data: {
            title: '📊 Data Fluency',
            description: 'Your skill in working with data, from analysis to insights to decisions',
            question: 'Select all that describe your data analysis and interpretation skills:',
            options: [
                { value: 3, text: 'I build statistical models and pipelines to generate insights at scale' },
                { value: 1, text: 'I read and interpret data, charts, and metrics to understand situations' },
                { value: 4, text: 'I design data systems and establish data-driven decision frameworks' },
                { value: 2, text: 'I query, manipulate, and visualize data to answer specific questions' },
                { value: 5, text: 'I create data strategies that fundamentally change how organizations operate' }
            ],
            labels: ['Consumes', 'Analyzes', 'Models', 'Architects', 'Transforms'],
            descriptions: [
                'Reads and interprets data, charts, and metrics to understand situations',
                'Queries, manipulates, and visualizes data to answer specific questions',
                'Builds statistical models and pipelines to generate insights at scale',
                'Designs data systems and establishes data-driven decision frameworks',
                'Creates data strategies that fundamentally change how organizations operate'
            ]
        },
        communication: {
            title: '💬 Communication',
            description: 'Your ability to share ideas, collaborate, and convey information effectively',
            question: 'Select all that describe your communication capabilities:',
            options: [
                { value: 2, text: 'I facilitate discussions and help teams reach consensus' },
                { value: 4, text: 'I communicate complex ideas to diverse audiences and drive alignment' },
                { value: 1, text: 'I communicate clearly with my team and document my work effectively' },
                { value: 5, text: 'I shape narratives and communicate vision that influences the broader community' },
                { value: 3, text: 'I present ideas persuasively and coordinate across multiple stakeholders' }
            ],
            labels: ['Articulates', 'Facilitates', 'Persuades', 'Aligns', 'Inspires'],
            descriptions: [
                'Communicates clearly with team and documents work effectively',
                'Facilitates discussions and helps teams reach consensus',
                'Presents ideas persuasively and coordinates across stakeholders',
                'Communicates complex ideas to diverse audiences and drives alignment',
                'Shapes narratives and communicates vision that influences the broader community'
            ]
        },
        leadership: {
            title: '🌟 Leadership',
            description: 'Your ability to influence, guide, and drive impact across teams and organizations',
            question: 'Select all that describe your leadership and influence capabilities:',
            options: [
                { value: 5, text: 'I shape organizational culture and drive industry-wide impact and change' },
                { value: 2, text: 'I enable and amplify my team\'s success through guidance and support' },
                { value: 3, text: 'I mentor others and drive outcomes across multiple teams' },
                { value: 1, text: 'I contribute quality work and step up when my team needs help' },
                { value: 4, text: 'I lead initiatives and shape strategy across the organization' }
            ],
            labels: ['Contributes', 'Enables', 'Mentors', 'Leads', 'Transforms'],
            descriptions: [
                'Contributes quality work and steps up when team needs help',
                'Enables and amplifies team\'s success through guidance and support',
                'Mentors others and drives outcomes across multiple teams',
                'Leads initiatives and shapes strategy across the organization',
                'Shapes organizational culture and drives industry-wide impact and change'
            ]
        }
    },

    init() {
        this.injectStyles();
        this.renderStartScreen();
    },

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
            .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
            .header h1 { font-size: 2.5em; margin-bottom: 10px; }
            .header p { font-size: 1.1em; opacity: 0.9; }
            .content { padding: 40px; }
            .intro { background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #667eea; }
            .intro h2 { color: #333; margin-bottom: 15px; }
            .intro ul { margin-left: 20px; color: #555; line-height: 1.8; }
            .intro p { margin: 15px 0; color: #555; line-height: 1.8; }
            .question-section { display: none; animation: fadeIn 0.5s; }
            .question-section.active { display: block; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .axis-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 25px; }
            .axis-header h2 { font-size: 1.8em; margin-bottom: 8px; }
            .axis-header p { opacity: 0.9; font-size: 1.05em; }
            .question { background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #667eea; }
            .question h3 { color: #333; margin-bottom: 20px; font-size: 1.2em; }
            .options { display: flex; flex-direction: column; gap: 12px; }
            .option { background: white; padding: 15px 20px; border-radius: 8px; border: 2px solid #e0e0e0; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; }
            .option:hover { border-color: #667eea; transform: translateX(5px); }
            .option input[type="checkbox"] { margin-right: 12px; width: 20px; height: 20px; cursor: pointer; accent-color: #667eea; }
            .option label { cursor: pointer; flex: 1; color: #333; font-size: 1.05em; }
            .option.selected { background: #667eea; border-color: #667eea; color: white; }
            .option.selected label { color: white; }
            .navigation { display: flex; justify-content: space-between; margin-top: 30px; gap: 15px; }
            .btn { padding: 15px 35px; border: none; border-radius: 8px; font-size: 1.1em; cursor: pointer; transition: all 0.3s; font-weight: 600; }
            .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); }
            .btn-secondary { background: #e0e0e0; color: #333; }
            .btn-secondary:hover { background: #d0d0d0; }
            .btn:disabled { opacity: 0.5; cursor: not-allowed; }
            .progress-bar { height: 8px; background: #e0e0e0; border-radius: 10px; margin-bottom: 30px; overflow: hidden; }
            .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); transition: width 0.3s; border-radius: 10px; }
            .results { display: none; text-align: center; }
            .results.active { display: block; }
            .chart-container { max-width: 600px; margin: 30px auto; padding: 20px; background: #f8f9fa; border-radius: 10px; }
            .level-description { background: #f8f9fa; padding: 25px; border-radius: 10px; margin-top: 30px; text-align: left; }
            .level-description h3 { color: #667eea; margin-bottom: 15px; }
            .level-item { margin-bottom: 20px; }
            .level-item strong { color: #333; display: block; margin-bottom: 5px; }
            .level-item span { color: #666; }
            .download-btn { margin-top: 20px; background: #28a745; color: white; }
            .download-btn:hover { background: #218838; }
            .start-section { text-align: center; }
            .start-section.hidden { display: none; }
            .start-btn { margin-top: 30px; padding: 20px 50px; font-size: 1.3em; }
        `;
        document.head.appendChild(style);
    },

    renderStartScreen() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = `
            <div class="header">
                <h1>🎯 Hybrid Role Self-Assessment</h1>
                <p>Discover your profile across Research, Engineering, Product & Data dimensions</p>
            </div>
            <div class="content">
                <div class="start-section" id="startSection">
                    <div class="intro">
                        <h2>About This Assessment</h2>
                        <p>This assessment is designed for professionals who navigate between research, engineering, product, and data analysis. It evaluates your capabilities across six key dimensions:</p>
                        <ul>
                            <li><strong>Technical Execution:</strong> Your ability to build, ship, and maintain systems</li>
                            <li><strong>Research & Analysis:</strong> Your depth in investigation, experimentation, and insight generation</li>
                            <li><strong>Product Thinking:</strong> Your understanding of user needs, strategy, and value creation</li>
                            <li><strong>Data Fluency:</strong> Your skill in working with data, from analysis to insights to decisions</li>
                            <li><strong>Communication:</strong> Your ability to share ideas, collaborate, and convey information effectively</li>
                            <li><strong>Leadership:</strong> Your ability to influence, guide, and drive impact across teams and organizations</li>
                        </ul>
                        <p><strong>Instructions:</strong> For each dimension, <strong>select all levels that apply</strong> to your current capabilities. This multi-selection approach captures both your <em>breadth</em> (how many levels) and <em>depth</em> (highest level achieved). You'll receive a spider chart visualizing your unique hybrid profile.</p>
                    </div>
                    <button class="btn btn-primary start-btn" onclick="QuizGenerator.startQuiz()">Start Assessment</button>
                </div>
                <div id="quizSection" style="display: none;"></div>
                <div class="results" id="resultsSection"></div>
            </div>
        `;
    },

    startQuiz() {
        document.getElementById('startSection').classList.add('hidden');
        document.getElementById('quizSection').style.display = 'block';
        this.renderQuizSection();
        this.updateProgress();
    },

    renderQuizSection() {
        const quizSection = document.getElementById('quizSection');
        let html = '<div class="progress-bar"><div class="progress-fill" id="progressBar"></div></div>';
        
        this.sections.forEach((section, index) => {
            const data = this.quizData[section];
            html += `
                <div class="question-section ${index === 0 ? 'active' : ''}" id="section-${section}">
                    <div class="axis-header">
                        <h2>${data.title}</h2>
                        <p>${data.description}</p>
                    </div>
                    <div class="question">
                        <h3>${data.question}</h3>
                        <div class="options">
                            ${data.options.map(opt => `
                                <div class="option" onclick="QuizGenerator.toggleOption(this, '${section}', ${opt.value}, event)">
                                    <input type="checkbox" name="${section}" id="${section}${opt.value}" value="${opt.value}" 
                                           onclick="QuizGenerator.toggleOption(this, '${section}', ${opt.value}, event);">
                                    <label for="${section}${opt.value}">${opt.text}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <div class="navigation">
                <button class="btn btn-secondary" id="prevBtn" onclick="QuizGenerator.previousSection()" style="display: none;">Previous</button>
                <button class="btn btn-primary" id="nextBtn" onclick="QuizGenerator.nextSection()" disabled>Next</button>
            </div>
        `;
        
        quizSection.innerHTML = html;
    },

    toggleOption(element, axis, value, event) {
        if (event && event.target.tagName === 'INPUT') {
            this.updateAnswerState(element, axis, value, event.target.checked);
            return;
        }
        
        const checkbox = element.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        this.updateAnswerState(element, axis, value, checkbox.checked);
    },

    updateAnswerState(element, axis, value, isChecked) {
        if (isChecked) {
            element.classList.add('selected');
        } else {
            element.classList.remove('selected');
        }
        
        if (!this.answers[axis]) {
            this.answers[axis] = [];
        }
        
        if (isChecked) {
            if (!this.answers[axis].includes(value)) {
                this.answers[axis].push(value);
            }
        } else {
            this.answers[axis] = this.answers[axis].filter(v => v !== value);
        }
        
        const hasSelection = this.answers[axis] && this.answers[axis].length > 0;
        document.getElementById('nextBtn').disabled = !hasSelection;
    },

    updateProgress() {
        const progress = (this.currentSection / this.sections.length) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
    },

    nextSection() {
        const currentAxis = this.sections[this.currentSection];
        
        if (!this.answers[currentAxis] || this.answers[currentAxis].length === 0) {
            alert('Please select at least one level before continuing.');
            return;
        }
        
        document.getElementById('section-' + currentAxis).classList.remove('active');
        this.currentSection++;
        
        if (this.currentSection < this.sections.length) {
            document.getElementById('section-' + this.sections[this.currentSection]).classList.add('active');
            document.getElementById('prevBtn').style.display = 'block';
            this.updateProgress();
            
            const hasSelection = this.answers[this.sections[this.currentSection]] && 
                                this.answers[this.sections[this.currentSection]].length > 0;
            document.getElementById('nextBtn').disabled = !hasSelection;
        } else {
            this.showResults();
        }
    },

    previousSection() {
        document.getElementById('section-' + this.sections[this.currentSection]).classList.remove('active');
        this.currentSection--;
        document.getElementById('section-' + this.sections[this.currentSection]).classList.add('active');
        
        if (this.currentSection === 0) {
            document.getElementById('prevBtn').style.display = 'none';
        }
        
        document.getElementById('nextBtn').disabled = false;
        this.updateProgress();
    },

    showResults() {
        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('resultsSection').classList.add('active');
        this.createRadarChart();
        this.displayLevelDescription();
    },

    createRadarChart() {
        const scores = this.sections.map(axis => {
            const selected = this.answers[axis] || [];
            if (selected.length === 0) return 0;
            
            const maxLevel = Math.max(...selected);
            const avgLevel = selected.reduce((a, b) => a + b, 0) / selected.length;
            return (maxLevel * 0.6) + (avgLevel * 0.4);
        });
        
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.innerHTML = `
            <h2 style="color: #333; margin-bottom: 20px; font-size: 2em;">Your Engineering Profile</h2>
            <div class="chart-container">
                <canvas id="radarChart"></canvas>
            </div>
            <div class="level-description" id="levelDescription"></div>
            <button class="btn btn-primary download-btn" onclick="QuizGenerator.downloadChart()">Download Chart</button>
            <button class="btn btn-secondary" onclick="QuizGenerator.restartQuiz()" style="margin-left: 10px;">Retake Assessment</button>
        `;
        
        const ctx = document.getElementById('radarChart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Technical Execution', 'Research & Analysis', 'Product Thinking', 'Data Fluency', 'Communication', 'Leadership'],
                datasets: [{
                    label: 'Your Hybrid Profile',
                    data: scores,
                    fill: true,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgb(102, 126, 234)',
                    pointBackgroundColor: 'rgb(102, 126, 234)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(102, 126, 234)',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true, color: 'rgba(0, 0, 0, 0.1)' },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: { stepSize: 1, font: { size: 12 } },
                        pointLabels: { font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const levelNames = {
                                    1: 'Implements/Explores/Executes/Consumes/Articulates/Contributes',
                                    2: 'Architects/Experiments/Contributes/Analyzes/Facilitates/Enables',
                                    3: 'Owns/Synthesizes/Shapes/Models/Persuades/Mentors',
                                    4: 'Scales/Advances/Strategizes/Architects/Aligns/Leads',
                                    5: 'Innovates/Pioneers/Defines/Transforms/Inspires/Transforms'
                                };
                                return 'Level ' + context.parsed.r + ': ' + levelNames[context.parsed.r];
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    },

    displayLevelDescription() {
        let html = '<h3>Your Current Levels</h3>';
        
        for (const axis of this.sections) {
            const selectedLevels = this.answers[axis] || [];
            const maxLevel = selectedLevels.length > 0 ? Math.max(...selectedLevels) : 0;
            const breadth = selectedLevels.length;
            const data = this.quizData[axis];
            
            html += `
                <div class="level-item">
                    <strong>${axis.charAt(0).toUpperCase() + axis.slice(1)}: </strong>
                    <span style="display: block; margin-top: 5px; color: #667eea; font-weight: 600;">
                        Depth: Level ${maxLevel} | Breadth: ${breadth} level${breadth !== 1 ? 's' : ''}
                    </span>
                    <span style="display: block; margin-top: 8px; font-size: 0.95em;">
                        Selected: ${selectedLevels.sort((a, b) => a - b).map(l => 
                            'Level ' + l + ' (' + data.labels[l - 1] + ')'
                        ).join(', ')}
                    </span>
                </div>
            `;
        }
        
        const avgMaxLevel = this.sections.reduce((sum, axis) => {
            const levels = this.answers[axis] || [];
            return sum + (levels.length > 0 ? Math.max(...levels) : 0);
        }, 0) / 6;
        
        const totalBreadth = this.sections.reduce((sum, axis) => 
            sum + (this.answers[axis] || []).length, 0
        );
        
        html += `<p style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; color: #667eea; font-weight: bold;">
            Average Depth: ${avgMaxLevel.toFixed(1)} / 5.0 | Total Breadth: ${totalBreadth} selections across all dimensions
        </p>`;
        
        document.getElementById('levelDescription').innerHTML = html;
    },

    downloadChart() {
        const canvas = document.getElementById('radarChart');
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'hybrid-role-profile.png';
        link.href = url;
        link.click();
    },

    restartQuiz() {
        this.currentSection = 0;
        this.answers = {};
        document.getElementById('resultsSection').classList.remove('active');
        document.getElementById('startSection').classList.remove('hidden');
        this.updateProgress();
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => QuizGenerator.init());
} else {
    QuizGenerator.init();
}
