import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, Copy, CheckCircle, Info, Plus, Trash2, Target, Zap, AlertCircle } from 'lucide-react';

const FreelanceRateCalculator = () => {
  const [activeTab, setActiveTab] = useState('hourly');
  const [inputs, setInputs] = useState({
    monthlyGoal: '',
    weeklyHours: '',
    monthlyExpenses: '',
    vacationWeeks: '2',
    skillLevel: 'intermediate',
    profitMargin: '20'
  });

  const [projectInputs, setProjectInputs] = useState({
    projectType: 'website',
    complexity: 'medium',
    timeline: '4',
    clientType: 'small_business',
    milestones: [
      { name: 'Planning & Research', hours: 8, description: 'Requirements gathering, wireframes' },
      { name: 'Development', hours: 20, description: 'Core functionality implementation' },
      { name: 'Testing & Launch', hours: 6, description: 'QA, deployment, handover' }
    ]
  });

  const [results, setResults] = useState(null);
  const [projectResults, setProjectResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const skillMultipliers = {
    beginner: 0.8,
    intermediate: 1.0,
    advanced: 1.3,
    expert: 1.6
  };

  const projectTypeTemplates = {
    website: {
      name: 'Website Development',
      baseMultiplier: 1.0,
      defaultMilestones: [
        { name: 'Planning & Research', hours: 8, description: 'Requirements, wireframes, design' },
        { name: 'Development', hours: 20, description: 'Frontend and backend implementation' },
        { name: 'Testing & Launch', hours: 6, description: 'QA, deployment, training' }
      ]
    },
    webapp: {
      name: 'Web Application',
      baseMultiplier: 1.3,
      defaultMilestones: [
        { name: 'Architecture & Planning', hours: 12, description: 'System design, database schema' },
        { name: 'Backend Development', hours: 25, description: 'API, database, business logic' },
        { name: 'Frontend Development', hours: 20, description: 'User interface, integration' },
        { name: 'Testing & Deployment', hours: 8, description: 'Testing, DevOps, launch' }
      ]
    },
    ecommerce: {
      name: 'E-commerce Store',
      baseMultiplier: 1.4,
      defaultMilestones: [
        { name: 'Store Setup & Design', hours: 15, description: 'Theme, product catalog, payment setup' },
        { name: 'Custom Features', hours: 18, description: 'Custom functionality, integrations' },
        { name: 'Testing & Launch', hours: 8, description: 'Payment testing, security, go-live' }
      ]
    },
    mobile: {
      name: 'Mobile App',
      baseMultiplier: 1.5,
      defaultMilestones: [
        { name: 'Design & Prototyping', hours: 16, description: 'UI/UX design, user flows' },
        { name: 'Development', hours: 40, description: 'App development, API integration' },
        { name: 'Testing & Publishing', hours: 12, description: 'QA, app store submission' }
      ]
    }
  };

  const complexityMultipliers = {
    simple: 0.7,
    medium: 1.0,
    complex: 1.4,
    enterprise: 1.8
  };

  const clientTypeMultipliers = {
    startup: 0.9,
    small_business: 1.0,
    medium_business: 1.2,
    enterprise: 1.5
  };

  const validateInputs = () => {
    const newErrors = {};
    
    if (!inputs.monthlyGoal || inputs.monthlyGoal <= 0) {
      newErrors.monthlyGoal = 'Please enter a valid monthly income goal';
    }
    
    if (!inputs.weeklyHours || inputs.weeklyHours <= 0 || inputs.weeklyHours > 168) {
      newErrors.weeklyHours = 'Please enter valid weekly hours (1-168)';
    }
    
    if (inputs.monthlyExpenses < 0) {
      newErrors.monthlyExpenses = 'Expenses cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateHourlyRates = () => {
    if (!validateInputs()) return;

    const monthlyGoal = parseFloat(inputs.monthlyGoal);
    const weeklyHours = parseFloat(inputs.weeklyHours);
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
    const vacationWeeks = parseFloat(inputs.vacationWeeks);
    const profitMargin = parseFloat(inputs.profitMargin) / 100;
    const skillMultiplier = skillMultipliers[inputs.skillLevel];

    const workingWeeks = 52 - vacationWeeks;
    const totalWorkingHours = workingWeeks * weeklyHours;
    
    const adjustedMonthlyGoal = (monthlyGoal + monthlyExpenses) * (1 + profitMargin);
    const annualGoal = adjustedMonthlyGoal * 12;
    
    const baseHourlyRate = annualGoal / totalWorkingHours;
    const adjustedHourlyRate = baseHourlyRate * skillMultiplier;
    
    const minProjectRate = adjustedHourlyRate * 10;
    const avgProjectRate = adjustedHourlyRate * 25;

    setResults({
      hourlyRate: Math.ceil(adjustedHourlyRate),
      minProjectRate: Math.ceil(minProjectRate),
      avgProjectRate: Math.ceil(avgProjectRate),
      workingWeeks,
      totalHours: totalWorkingHours,
      skillLevel: inputs.skillLevel,
      profitMargin: inputs.profitMargin
    });
  };

  const calculateProjectRate = () => {
    if (!results) {
      calculateHourlyRates();
      return;
    }

    const baseHourlyRate = results.hourlyRate;
    const projectTemplate = projectTypeTemplates[projectInputs.projectType];
    const complexityMultiplier = complexityMultipliers[projectInputs.complexity];
    const clientMultiplier = clientTypeMultipliers[projectInputs.clientType];
    const rushMultiplier = projectInputs.timeline <= 2 ? 1.3 : projectInputs.timeline <= 4 ? 1.1 : 1.0;

    const totalHours = projectInputs.milestones.reduce((sum, milestone) => sum + parseInt(milestone.hours || 0), 0);
    
    const finalHourlyRate = baseHourlyRate * projectTemplate.baseMultiplier * complexityMultiplier * clientMultiplier * rushMultiplier;
    const projectTotal = totalHours * finalHourlyRate;
    
    // Calculate milestone breakdown
    const milestoneBreakdown = projectInputs.milestones.map(milestone => ({
      ...milestone,
      cost: parseInt(milestone.hours || 0) * finalHourlyRate,
      percentage: (parseInt(milestone.hours || 0) / totalHours) * 100
    }));

    setProjectResults({
      totalCost: Math.ceil(projectTotal),
      adjustedHourlyRate: Math.ceil(finalHourlyRate),
      totalHours,
      milestones: milestoneBreakdown,
      projectType: projectTemplate.name,
      multipliers: {
        complexity: complexityMultiplier,
        client: clientMultiplier,
        rush: rushMultiplier,
        projectType: projectTemplate.baseMultiplier
      }
    });
  };

  const addMilestone = () => {
    setProjectInputs(prev => ({
      ...prev,
      milestones: [...prev.milestones, { name: '', hours: 0, description: '' }]
    }));
  };

  const removeMilestone = (index) => {
    setProjectInputs(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const updateMilestone = (index, field, value) => {
    setProjectInputs(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const loadProjectTemplate = (projectType) => {
    const template = projectTypeTemplates[projectType];
    setProjectInputs(prev => ({
      ...prev,
      projectType,
      milestones: [...template.defaultMilestones]
    }));
  };

  const copyToClipboard = (type = 'hourly') => {
    let text = '';
    
    if (type === 'hourly' && results) {
      text = `My freelance rates:
• Hourly rate: $${results.hourlyRate}/hour
• Minimum project: $${results.minProjectRate}
• Average project: $${results.avgProjectRate}

Calculated for ${inputs.skillLevel} level with ${inputs.weeklyHours}h/week`;
    } else if (type === 'project' && projectResults) {
      text = `Project Quote - ${projectResults.projectType}:
• Total: $${projectResults.totalCost}
• Timeline: ${projectInputs.timeline} weeks
• Total hours: ${projectResults.totalHours}

Milestone Breakdown:
${projectResults.milestones.map(m => `• ${m.name}: $${Math.ceil(m.cost)} (${m.hours}h)`).join('\n')}`;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPricingTip = () => {
    if (!results) return '';
    
    const { hourlyRate } = results;
    
    if (hourlyRate < 25) {
      return "💡 Consider focusing on skill development and building a strong portfolio to command higher rates.";
    } else if (hourlyRate < 50) {
      return "💡 Good range for intermediate work. Consider specializing in high-demand technologies or niches.";
    } else if (hourlyRate < 100) {
      return "💡 Strong rate! Focus on delivering exceptional value and building long-term client relationships.";
    } else {
      return "💡 Premium rate territory! Ensure your portfolio and testimonials justify this level of expertise.";
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (inputs.monthlyGoal && inputs.weeklyHours) {
      calculateHourlyRates();
    }
  }, [inputs]);

  useEffect(() => {
    if (results && projectInputs.milestones.length > 0) {
      calculateProjectRate();
    }
  }, [projectInputs, results]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Freelance Rate Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Calculate your ideal hourly rates and get precise project quotes with milestone breakdowns. 
          Stop guessing — start pricing with confidence.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'hourly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Hourly Rates
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'project' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Project Quote
          </button>
        </div>
      </div>

      {activeTab === 'hourly' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hourly Rate Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Your Details</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income Goal ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.monthlyGoal}
                    onChange={(e) => handleInputChange('monthlyGoal', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.monthlyGoal ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 5000"
                  />
                </div>
                {errors.monthlyGoal && (
                  <p className="text-red-500 text-sm mt-1">{errors.monthlyGoal}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Available per Week
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.weeklyHours}
                    onChange={(e) => handleInputChange('weeklyHours', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.weeklyHours ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 30"
                  />
                </div>
                {errors.weeklyHours && (
                  <p className="text-red-500 text-sm mt-1">{errors.weeklyHours}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Business Expenses ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={inputs.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 200"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Software, internet, equipment, etc.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vacation Weeks/Year
                  </label>
                  <select
                    value={inputs.vacationWeeks}
                    onChange={(e) => handleInputChange('vacationWeeks', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="0">0 weeks</option>
                    <option value="1">1 week</option>
                    <option value="2">2 weeks</option>
                    <option value="3">3 weeks</option>
                    <option value="4">4 weeks</option>
                    <option value="6">6 weeks</option>
                    <option value="8">8 weeks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profit Margin (%)
                  </label>
                  <select
                    value={inputs.profitMargin}
                    onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="10">10% (Conservative)</option>
                    <option value="20">20% (Standard)</option>
                    <option value="30">30% (Aggressive)</option>
                    <option value="40">40% (Premium)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <select
                  value={inputs.skillLevel}
                  onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (2-4 years)</option>
                  <option value="advanced">Advanced (5-8 years)</option>
                  <option value="expert">Expert (8+ years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hourly Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Your Recommended Rates</span>
            </h2>

            {!results ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Fill out the form to see your recommended rates</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Hourly Rate</p>
                        <p className="text-2xl font-bold text-blue-900">${results.hourlyRate}/hour</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Minimum Project</p>
                        <p className="text-2xl font-bold text-green-900">${results.minProjectRate}</p>
                      </div>
                      <div className="text-green-600">💼</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Average Project</p>
                        <p className="text-2xl font-bold text-purple-900">${results.avgProjectRate}</p>
                      </div>
                      <div className="text-purple-600">🚀</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">{getPricingTip()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-medium text-gray-900">Calculation Summary</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Working {results.workingWeeks} weeks per year</p>
                    <p>• Total billable hours: {results.totalHours.toLocaleString()}</p>
                    <p>• Profit margin: {results.profitMargin}%</p>
                    <p>• Skill level: {results.skillLevel}</p>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard('hourly')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Rates to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'project' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Project Details</span>
            </h2>

            {!results && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-800">
                    <strong>Set your hourly rates first!</strong> Switch to the "Hourly Rates" tab and fill out your details to enable project calculations.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    value={projectInputs.projectType}
                    onChange={(e) => loadProjectTemplate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!results}
                  >
                    {Object.entries(projectTypeTemplates).map(([key, template]) => (
                      <option key={key} value={key}>{template.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complexity
                  </label>
                  <select
                    value={projectInputs.complexity}
                    onChange={(e) => setProjectInputs(prev => ({ ...prev, complexity: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!results}
                  >
                    <option value="simple">Simple (-30%)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="complex">Complex (+40%)</option>
                    <option value="enterprise">Enterprise (+80%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline (weeks)
                  </label>
                  <select
                    value={projectInputs.timeline}
                    onChange={(e) => setProjectInputs(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!results}
                  >
                    <option value="1">1 week (Rush +30%)</option>
                    <option value="2">2 weeks (Rush +30%)</option>
                    <option value="3">3 weeks (Tight +10%)</option>
                    <option value="4">4 weeks (Tight +10%)</option>
                    <option value="6">6 weeks (Standard)</option>
                    <option value="8">8 weeks (Standard)</option>
                    <option value="12">12+ weeks (Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Type
                  </label>
                  <select
                    value={projectInputs.clientType}
                    onChange={(e) => setProjectInputs(prev => ({ ...prev, clientType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!results}
                  >
                    <option value="startup">Startup (-10%)</option>
                    <option value="small_business">Small Business</option>
                    <option value="medium_business">Medium Business (+20%)</option>
                    <option value="enterprise">Enterprise (+50%)</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Milestones
                  </label>
                  <button
                    onClick={addMilestone}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    disabled={!results}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {projectInputs.milestones.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={milestone.name}
                          onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                          placeholder="Milestone name"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={!results}
                        />
                        {projectInputs.milestones.length > 1 && (
                          <button
                            onClick={() => removeMilestone(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            disabled={!results}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={milestone.hours}
                          onChange={(e) => updateMilestone(index, 'hours', e.target.value)}
                          placeholder="Hours"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={!results}
                        />
                        <input
                          type="text"
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                          placeholder="Brief description"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={!results}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 mb-6">
              <Zap className="w-5 h-5 text-purple-600" />
              <span>Project Quote</span>
            </h2>

            {!results ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Set your hourly rates first to generate project quotes</p>
              </div>
            ) : !projectResults ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-500">Calculating your project quote...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Total Cost */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                  <p className="text-sm font-medium text-purple-700 mb-2">Total Project Cost</p>
                  <p className="text-4xl font-bold text-purple-900">${projectResults.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-purple-700 mt-2">
                    {projectResults.totalHours} hours × ${projectResults.adjustedHourlyRate}/hour
                  </p>
                </div>

                {/* Milestone Breakdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Milestone Breakdown</h3>
                  <div className="space-y-3">
                    {projectResults.milestones.map((milestone, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                          <span className="text-lg font-semibold text-gray-900">
                            ${Math.ceil(milestone.cost).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{milestone.description}</span>
                          <span>{milestone.hours}h ({milestone.percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${milestone.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Factors */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-3">Pricing Factors Applied</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Project Type:</span>
                      <span className="font-medium text-blue-900">
                        {(projectResults.multipliers.projectType * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Complexity:</span>
                      <span className="font-medium text-blue-900">
                        {(projectResults.multipliers.complexity * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Client Type:</span>
                      <span className="font-medium text-blue-900">
                        {(projectResults.multipliers.client * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Timeline:</span>
                      <span className="font-medium text-blue-900">
                        {(projectResults.multipliers.rush * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Terms Suggestion */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">💡 Suggested Payment Terms</h3>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>• 30% upfront: ${Math.ceil(projectResults.totalCost * 0.3).toLocaleString()}</p>
                    <p>• 40% at milestone completion: ${Math.ceil(projectResults.totalCost * 0.4).toLocaleString()}</p>
                    <p>• 30% on project delivery: ${Math.ceil(projectResults.totalCost * 0.3).toLocaleString()}</p>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard('project')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Project Quote</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Tips Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Pro Tips for Freelancers</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Value-Based Pricing</h4>
            <p className="text-gray-600">Don't compete on price alone. Focus on the value you provide and the problems you solve for clients.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📈 Regular Rate Reviews</h4>
            <p className="text-gray-600">Review and adjust your rates every 6-12 months as your skills and experience grow.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🔒 Scope Protection</h4>
            <p className="text-gray-600">Always define project scope clearly and charge for additional work outside the original agreement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceRateCalculator;