import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("Seeding database with Lord of the Rings characters...");

	// Create Gandalf as Employer
	const gandalf = await prisma.user.upsert({
		where: { email: "gandalf@middleearth.com" },
		update: {},
		create: {
			id: "1",
			email: "gandalf@middleearth.com",
			password: "$2b$10$epgDo3.ebUWtQc.5q.1234567890abcdefg", // hashed placeholder
			role: "EMPLOYER",
		},
	});

	console.log(`✅ Employer created: ${gandalf.email}`);

	// Create Employees (Fellowship members)
	const fellowship = [
		{ firstName: "Frodo", lastName: "Baggins", loginCode: "FRODO9" },
		{ firstName: "Sam", lastName: "Gamgee", loginCode: "SAM123" },
		{ firstName: "Legolas", lastName: "Greenleaf", loginCode: "ELF42" },
		{ firstName: "Gimli", lastName: "Son of Gloin", loginCode: "DWARF1" },
		{
			firstName: "Aragorn",
			lastName: "Son of Arathorn",
			loginCode: "KING1",
		},
		{ firstName: "Boromir", lastName: "of Gondor", loginCode: "GONDOR7" },
		{ firstName: "Merry", lastName: "Brandybuck", loginCode: "H0BB1T" },
		{ firstName: "Pippin", lastName: "Took", loginCode: "TOOK12" },
	];

	for (const member of fellowship) {
		const user = await prisma.user.upsert({
			where: { email: `${member.firstName.toLowerCase()}@shire.net` },
			update: {},
			create: {
				id: crypto.randomUUID(),
				email: `${member.firstName.toLowerCase()}@shire.net`,
				password: "$2b$10$epgDo3.ebUWtQc.5q.1234567890abcdefg", // placeholder
				role: "EMPLOYEE",
			},
		});

		const employee = await prisma.employee.create({
			data: {
				id: crypto.randomUUID(),
				firstName: member.firstName,
				lastName: member.lastName,
				loginCode: member.loginCode,
				userId: user.id,
			},
		});

		console.log(
			`✅ Employee created: ${employee.firstName} ${employee.lastName}`,
		);
	}

	// Add Availabilities: Gandalf schedules Frodo for morning shifts next week
	const frodo = await prisma.user.findFirst({
		where: { email: "frodo@shire.net" },
		include: { employee: true },
	});

	if (frodo?.employee) {
		const baseDate = new Date();
		baseDate.setDate(baseDate.getDate() + 7); // Next week

		for (let i = 0; i < 3; i++) {
			const date = new Date(baseDate);
			date.setDate(baseDate.getDate() + i);

			await prisma.availability.create({
				data: {
					id: crypto.randomUUID(),
					employeeId: frodo.employee.id,
					date,
					shift: "MORNING",
				},
			});

			await prisma.scheduleEntry.create({
				data: {
					id: crypto.randomUUID(),
					employeeId: frodo.employee.id,
					date,
					shift: "MORNING",
					assignedBy: gandalf.id,
				},
			});

			console.log(
				`📅 Scheduled Frodo for MORNING shift on ${date.toISOString().split("T")[0]}`,
			);
		}
	}

	console.log("✅ Database seeded successfully with Middle-earth staff!");
}

main()
	.catch((e) => {
		console.error("Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
