import { Transaction } from "../entities";

export class TransactionService {
    async getTransactionById(id: number) {
        if (!id) {
            return null;
        }
        const transaction = await Transaction.findOne({ id: id });
        return transaction;
    }

    async getTransactionsByUserId(userId: string) {
        if (!userId) {
            return null;
        }
        const transactions = await Transaction.find({ userId: +userId });
        return transactions;
    }

    async createTransaction(userId: number, type: string, recurring_type: string, date: string, end_date: string, amount: number) {
        const transaction = new Transaction();
        transaction.userId = userId;
        transaction.type = type;
        transaction.recurring_type = recurring_type;
        transaction.date = date;
        transaction.end_date = end_date;
        transaction.amount = amount;
        await transaction.save();
        return transaction;
    }

    async updateTransaction(id: number, userId: number, type: string, recurring_type: string, date: string, end_date: string, amount: number) {
        const transaction = await Transaction.preload({
            id: id,
            userId: userId,
            type: type,
            recurring_type: recurring_type,
            date: date,
            end_date: end_date,
            amount: amount,
        });
        if (!transaction) {
            this.createTransaction(userId, type, recurring_type, date, end_date, amount);
        }
    }

    async deleteTransaction(id: number) {
        await Transaction.delete({ id: id });
    }
}
