const Company = require('../models/Company'); 
class CompanyController {

    static async createCompany(req, res) {

        try {
            const {
                cnpj,
                phone,
                ie,
                corporateReason,
                fantasyName,
                street,
                numberStreet,
                neighborhood
            } = req.body;
            if (!req.file || !req.file.filename) {
                return res.status(400).json({ error: "Logo da empresa não enviado" });
            }
            const logo = req.file.filename; 

            await Company.create({
                cnpj,
                phone,
                ie,
                corporateReason,
                fantasyName,
                street,
                numberStreet,
                neighborhood,
                logo
            });

            return res.status(201).json({ message: "Empresa criada com sucesso" });
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
            res.status(500).json({ error: "Erro ao criar empresa" });
        }
    }


    static async listCompanies(req, res) {
        try {
            const companies = await Company.findAll();
            return res.status(200).json(companies);
        } catch (error) {
            console.error("Erro ao listar empresas:", error);
            res.status(500).json({ error: "Erro ao listar empresas" });
        }
    }


    static async updateCompany(req, res) {
        const companyId = req.params.companyId;
        const updatedCompanyData = req.body;

        try {
            const company = await Company.findByPk(companyId);

            if (!company) {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }

            await company.update(updatedCompanyData);

            return res.status(200).json({ message: "Empresa atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            res.status(500).json({ error: "Erro ao atualizar empresa" });
        }
    }


    static async deleteCompany(req, res) {
        const companyId = req.params.companyId;
        try {
            const deletedRows = await Company.destroy({
                where: {
                    id: companyId,
                },
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }

            return res.status(200).json({ message: "Empresa excluída com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir empresa:", error);
            res.status(500).json({ error: "Erro ao excluir empresa" });
        }
    }
    
    
    static async findCompanyByUserId(req, res) {
        const { userId } = req.params;
    
        try {
            const company = await Company.findOne({
                where: {
                    userId: userId,
                },
            });
    
            if (!company) {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }
    
            return res.status(200).json(company);
        } catch (error) {
            console.error("Erro ao buscar empresa pelo userId:", error);
            res.status(500).json({ error: "Erro ao buscar empresa pelo userId" });
        }
    }
    
}



module.exports = CompanyController;
