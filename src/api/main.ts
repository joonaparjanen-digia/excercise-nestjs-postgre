import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger'

import packageJson from '../../package.json'

import { AppModule } from './app.module'

const swaggerDocumentOptions: SwaggerDocumentOptions = {}
const swaggerCustomOptions: SwaggerCustomOptions = {
	customSiteTitle: 'API Docs',
}

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	const config = new DocumentBuilder()
		.setTitle(packageJson.name)
		.setDescription(packageJson.description)
		.setVersion(packageJson.version)
		.build()

	const document = SwaggerModule.createDocument(app, config, swaggerDocumentOptions)
	SwaggerModule.setup('docs', app, document, swaggerCustomOptions)

	await app.listen(3000)
}
bootstrap()
