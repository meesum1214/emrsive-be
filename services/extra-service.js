const db = require("../models");

const createRoles = async () => {

    let role = await db.roles.findAll({ raw: true });

    // console.log(role)

    if (role.length === 0) {
        // console.log("creating roles")
        db.roles.create({
            name: "admin",
        });
        db.roles.create({
            name: "user",
        });
    }

    console.log("===========>> Roles already created")
}

const createPlans = async () => {

    let basicPlan = [
        { content: '5 Hot selling Products' },
        { content: 'Eye Catching Logo Design' },
        { content: 'Premium theme' },
        { content: 'Premium Apps' }
    ]

    let standardPlan = [
        { content: '10 Hot selling Products' },
        { content: 'Eye Catching Logo Design' },
        { content: 'Premium theme' },
        { content: 'Premium Apps + Plugins' },
        { content: 'Social Media Pages' },
        { content: 'Social Media Posts' },
        { content: 'Social Media Marketing' },
        { content: 'Premium Product Videos' },
    ]

    let premiumPlan = [
        { content: '10 Hot selling Products' },
        { content: 'Eye Catching Logo Design' },
        { content: 'Premium theme' },
        { content: 'Premium Apps + Plugins' },
        { content: 'Social Media Pages' },
        { content: 'Social Media Posts' },
        { content: 'Social Media Marketing' },
        { content: 'Premium Product Videos' },
        { content: 'Content Writing' },
        { content: 'Website SEO' },
        { content: 'Private Email' },
        { content: 'Full Store Management' },
    ]

    let plan = await db.plans.findAll({raw: true});

    // console.log(plan)

    if (plan.length === 0) {
        await db.plans.create({
            name: "Basic",
            price: 495,
            description: `${JSON.stringify(basicPlan)}`,
        });

        await db.plans.create({
            name: "Standard",
            price: 1495,
            description: `${JSON.stringify(standardPlan)}`,
        });

        await db.plans.create({
            name: "Premium",
            price: 2495,
            description: `${JSON.stringify(premiumPlan)}`,
        });
    }

    console.log("===========>> Plans already created")
}

module.exports = {
    createRoles,
    createPlans,
}