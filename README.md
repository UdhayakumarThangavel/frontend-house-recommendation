# House Recommendation - React

## Overview

The House Recommendation application is a simple yet powerful UI system that allows users to create and customize a housing layout of M x N dimensions. Users can assign each plot in the layout with either a House, Restaurant, Gym, or Hospital. The application calculates a score for each house based on the availability of nearby services (Restaurant, Gym, Hospital) within a 1km distance. The goal is to recommend the best-suited house for rent based on these criteria.

## Key Features

1. **Dynamic Housing Layout**: Users can easily create a custom housing layout of any dimensions (M x N) through an intuitive interface.

2. **Plot Assignment**: Each plot in the layout can be assigned with a House, Restaurant, Gym, or Hospital. However, a plot can accommodate a maximum of one House and can have a combination of services.

3. **Unique House Label**: Users can add a unique label to identify each House, making it easier to differentiate between different properties.

4. **Scoring Mechanism**: The application calculates a score for each house based on the availability of nearby services. The closer the services, the higher the score.

5. **Recommendation Button**: The UI provides a dedicated button that generates a recommendation for the best house to choose based on the calculated scores.

## Tech Stack

- Frontend: React
- UI Components: Bootstrap

## Installation

1. Clone this repository: `git clone https://github.com/UdhayakumarThangavel/frontend-house-recommendation.git`
2. Navigate to the project directory: `cd frontend-house-recommendation`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:3000`

## Usage

1. Upon launching the application, users can set the dimensions of the housing layout (M x N).

2. Click on each plot in the layout to assign a type (House, Restaurant, Gym, or Hospital).

3. Add a unique label to identify each House in the layout.

4. Once the layout is set, use the "Recommend" button to get the best house recommendation based on nearby services.


