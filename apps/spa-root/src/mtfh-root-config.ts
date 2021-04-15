import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

import './styles/global.scss';

const routes = constructRoutes(
    document.querySelector('#single-spa-layout') as HTMLTemplateElement
);

const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return System.import(name);
    },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

for (const application of applications) {
    registerApplication(application);
}

layoutEngine.activate();

start();
