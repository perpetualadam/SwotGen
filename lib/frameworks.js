// Framework definitions and metadata for all strategic analysis frameworks

export const FRAMEWORKS = {
  swot: {
    id: 'swot',
    name: 'SWOT Analysis',
    description: 'Strengths, Weaknesses, Opportunities, Threats',
    categories: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
    scoreField: 'NicheScore',
    scoreLabel: 'Niche Viability Score',
    layout: '2x2',
    colors: {
      Strengths: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Weaknesses: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', header: 'bg-red-100' },
      Opportunities: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Threats: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' }
    },
    icons: {
      Strengths: '💪',
      Weaknesses: '⚠️',
      Opportunities: '🚀',
      Threats: '🎯'
    }
  },
  pestle: {
    id: 'pestle',
    name: 'PESTLE Analysis',
    description: 'Political, Economic, Social, Technological, Legal, Environmental',
    categories: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
    scoreField: 'ViabilityScore',
    scoreLabel: 'Market Viability Score',
    layout: '2x3',
    colors: {
      Political: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' },
      Economic: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Social: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', header: 'bg-pink-100' },
      Technological: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Legal: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      Environmental: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', header: 'bg-amber-100' }
    },
    icons: {
      Political: '🏛️',
      Economic: '💰',
      Social: '👥',
      Technological: '🔧',
      Legal: '⚖️',
      Environmental: '🌍'
    }
  },
  porters: {
    id: 'porters',
    name: "Porter's Five Forces",
    description: 'Competitive Rivalry, Supplier Power, Buyer Power, Threat of Substitution, Threat of New Entry',
    categories: ['CompetitiveRivalry', 'SupplierPower', 'BuyerPower', 'ThreatOfSubstitution', 'ThreatOfNewEntry'],
    categoryLabels: {
      CompetitiveRivalry: 'Competitive Rivalry',
      SupplierPower: 'Supplier Power',
      BuyerPower: 'Buyer Power',
      ThreatOfSubstitution: 'Threat of Substitution',
      ThreatOfNewEntry: 'Threat of New Entry'
    },
    scoreField: 'CompetitiveIntensity',
    scoreLabel: 'Competitive Intensity Score',
    layout: '2x3',
    colors: {
      CompetitiveRivalry: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', header: 'bg-red-100' },
      SupplierPower: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      BuyerPower: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' },
      ThreatOfSubstitution: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      ThreatOfNewEntry: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' }
    },
    icons: {
      CompetitiveRivalry: '⚔️',
      SupplierPower: '🤝',
      BuyerPower: '👤',
      ThreatOfSubstitution: '🔄',
      ThreatOfNewEntry: '🚪'
    }
  },
  noise: {
    id: 'noise',
    name: 'NOISE Analysis',
    description: 'Needs, Opportunities, Improvements, Strengths, Exceptions',
    categories: ['Needs', 'Opportunities', 'Improvements', 'Strengths', 'Exceptions'],
    scoreField: 'PotentialScore',
    scoreLabel: 'Growth Potential Score',
    layout: '2x3',
    colors: {
      Needs: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Opportunities: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Improvements: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' },
      Strengths: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' },
      Exceptions: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' }
    },
    icons: {
      Needs: '🎯',
      Opportunities: '💡',
      Improvements: '🔧',
      Strengths: '💪',
      Exceptions: '⭐'
    }
  },
  'balanced-scorecard': {
    id: 'balanced-scorecard',
    name: 'Balanced Scorecard',
    description: 'Financial, Customer, Internal Processes, Learning & Growth',
    categories: ['Financial', 'Customer', 'InternalProcesses', 'LearningGrowth'],
    categoryLabels: {
      InternalProcesses: 'Internal Processes',
      LearningGrowth: 'Learning & Growth'
    },
    scoreField: 'StrategicAlignment',
    scoreLabel: 'Strategic Alignment Score',
    layout: '2x2',
    colors: {
      Financial: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Customer: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      InternalProcesses: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      LearningGrowth: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' }
    },
    icons: {
      Financial: '💵',
      Customer: '😊',
      InternalProcesses: '⚙️',
      LearningGrowth: '📚'
    }
  },
  vrio: {
    id: 'vrio',
    name: 'VRIO Framework',
    description: 'Value, Rarity, Imitability, Organization',
    categories: ['Value', 'Rarity', 'Imitability', 'Organization'],
    scoreField: 'CompetitiveAdvantage',
    scoreLabel: 'Competitive Advantage Score',
    layout: '2x2',
    colors: {
      Value: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Rarity: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Imitability: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      Organization: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' }
    },
    icons: {
      Value: '💎',
      Rarity: '🌟',
      Imitability: '🔐',
      Organization: '🏢'
    }
  },
  'mckinsey-7s': {
    id: 'mckinsey-7s',
    name: 'McKinsey 7S Model',
    description: 'Strategy, Structure, Systems, Shared Values, Skills, Style, Staff',
    categories: ['Strategy', 'Structure', 'Systems', 'SharedValues', 'Skills', 'Style', 'Staff'],
    categoryLabels: {
      SharedValues: 'Shared Values',
      Style: 'Leadership Style'
    },
    scoreField: 'OrganizationalAlignment',
    scoreLabel: 'Organizational Alignment Score',
    layout: '2x3',
    colors: {
      Strategy: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', header: 'bg-red-100' },
      Structure: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      Systems: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' },
      SharedValues: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Skills: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Style: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' },
      Staff: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', header: 'bg-pink-100' }
    },
    icons: {
      Strategy: '🎯',
      Structure: '🏗️',
      Systems: '💻',
      SharedValues: '💝',
      Skills: '🎓',
      Style: '🎨',
      Staff: '👨‍💼'
    }
  },
  bmc: {
    id: 'bmc',
    name: 'Business Model Canvas',
    description: 'Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure',
    categories: ['CustomerSegments', 'ValuePropositions', 'Channels', 'CustomerRelationships', 'RevenueStreams', 'KeyResources', 'KeyActivities', 'KeyPartnerships', 'CostStructure'],
    categoryLabels: {
      CustomerSegments: 'Customer Segments',
      ValuePropositions: 'Value Propositions',
      CustomerRelationships: 'Customer Relationships',
      RevenueStreams: 'Revenue Streams',
      KeyResources: 'Key Resources',
      KeyActivities: 'Key Activities',
      KeyPartnerships: 'Key Partnerships',
      CostStructure: 'Cost Structure'
    },
    scoreField: 'BusinessViability',
    scoreLabel: 'Business Model Viability Score',
    layout: '3x3',
    colors: {
      CustomerSegments: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      ValuePropositions: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      Channels: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' },
      CustomerRelationships: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', header: 'bg-pink-100' },
      RevenueStreams: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' },
      KeyResources: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      KeyActivities: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', header: 'bg-red-100' },
      KeyPartnerships: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', header: 'bg-cyan-100' },
      CostStructure: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', header: 'bg-gray-100' }
    },
    icons: {
      CustomerSegments: '👥',
      ValuePropositions: '💡',
      Channels: '📢',
      CustomerRelationships: '🤝',
      RevenueStreams: '💰',
      KeyResources: '🔧',
      KeyActivities: '⚡',
      KeyPartnerships: '🤲',
      CostStructure: '💸'
    }
  },
  ansoff: {
    id: 'ansoff',
    name: 'Ansoff Matrix',
    description: 'Market Penetration, Market Development, Product Development, Diversification',
    categories: ['MarketPenetration', 'MarketDevelopment', 'ProductDevelopment', 'Diversification'],
    categoryLabels: {
      MarketPenetration: 'Market Penetration',
      MarketDevelopment: 'Market Development',
      ProductDevelopment: 'Product Development'
    },
    scoreField: 'GrowthPotential',
    scoreLabel: 'Growth Potential Score',
    layout: '2x2',
    colors: {
      MarketPenetration: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      MarketDevelopment: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      ProductDevelopment: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      Diversification: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' }
    },
    icons: {
      MarketPenetration: '📈',
      MarketDevelopment: '🌍',
      ProductDevelopment: '🚀',
      Diversification: '🎯'
    }
  },
  vpc: {
    id: 'vpc',
    name: 'Value Proposition Canvas',
    description: 'Customer Jobs, Pains, Gains, Products & Services, Pain Relievers, Gain Creators',
    categories: ['CustomerJobs', 'Pains', 'Gains', 'ProductsServices', 'PainRelievers', 'GainCreators'],
    categoryLabels: {
      CustomerJobs: 'Customer Jobs',
      ProductsServices: 'Products & Services',
      PainRelievers: 'Pain Relievers',
      GainCreators: 'Gain Creators'
    },
    scoreField: 'ValueAlignment',
    scoreLabel: 'Value Alignment Score',
    layout: '2x3',
    colors: {
      CustomerJobs: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-100' },
      Pains: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', header: 'bg-red-100' },
      Gains: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', header: 'bg-green-100' },
      ProductsServices: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-100' },
      PainRelievers: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', header: 'bg-orange-100' },
      GainCreators: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', header: 'bg-yellow-100' }
    },
    icons: {
      CustomerJobs: '🎯',
      Pains: '⚠️',
      Gains: '✨',
      ProductsServices: '📦',
      PainRelievers: '🛡️',
      GainCreators: '🌟'
    }
  }
};

// Get framework by ID
export function getFramework(frameworkId) {
  return FRAMEWORKS[frameworkId] || FRAMEWORKS.swot;
}

// Get all framework options for dropdown
export function getFrameworkOptions() {
  return Object.values(FRAMEWORKS).map(framework => ({
    id: framework.id,
    name: framework.name,
    description: framework.description
  }));
}

// Get display label for a category (handles camelCase to readable format)
export function getCategoryLabel(framework, category) {
  if (framework.categoryLabels && framework.categoryLabels[category]) {
    return framework.categoryLabels[category];
  }
  return category;
}

