export const medicationReferences = [
  {
    id: 'immunosuppression',
    title: 'Immunosuppression',
    summary: 'Standard and alternative immunosuppression regimens.',
    content: `# Standard Immunosupression Regimen
## Tacrolimus (Prograf)
- Dose: 0.05-0.075 mg/kg PO BID
- Taper:
- POD 1-14: 8-10 ng/mL
- POD 15-90: 6-8 ng/mL
- >POD 90: 4-6 ng/mL

## Mycophenolate Mofetil (MMF)
- Dose: 1000-1500 mg PO BID
- Taper: Maintain unless GI intolerance/infection

## Prednisone
- Dose: 20-30 mg PO daily (Start)
- Taper: Down to 5 mg/day by week 6
- Taper earlier if steroid-sensitive disease (e.g. T2DM), no rejection, stable labs

# Alternative regimen (mTOR)
- Everolimus 0.75 mg BID or Sirolimus 2 md QD (Start day 30)
- Low dose Tac

# Alternative regimen (Belatacept)
## Belatacept
- Dose: 10 mg/kg IV on Days 1, 5
- Taper dose: 5 mg/kg q4wk weeks 2, 4, 8, 12

## Mycophenolate Mofetil (MMF)
## Prednisone`
  },
  {
    id: 'prophylaxis-after-transplant',
    title: 'Prophylaxis after Transplant',
    summary: 'Post-transplant prophylaxis indications, medications, and timeline.',
    table: {
      headers: ['Indication', 'Medication', 'Duration'],
      rows: [
        [
          'CMV',
          'Valganciclovir 900 mg daily (adjust if eGFR < 60)',
          '3-6 mo depending on D/R status'
        ],
        [
          'PCP',
          'TMP-SMX SS PO daily',
          '6-12 months'
        ],
        [
          'Fungal',
          'Nystatin 5 mL QID',
          '30 days'
        ],
        [
          'GI',
          'Pantoprazole 40 mg daily',
          '1 month or until steroids tapered'
        ]
      ]
    }
  }
];

export const getMedicationById = (medicationId) =>
  medicationReferences.find((item) => item.id === medicationId);
