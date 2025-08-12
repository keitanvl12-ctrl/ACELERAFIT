import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SubscriptionData {
  id: string;
  planName: string;
  planType: string;
  amount: string;
  status: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
}

interface PaymentData {
  id: string;
  amount: string;
  status: string;
  paymentMethod: string;
  dueDate: string;
  paidDate?: string;
}

export default function Financeiro() {
  const { data: subscription, isLoading: subscriptionLoading } = useQuery<SubscriptionData>({
    queryKey: ["/api/subscription/current"],
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery<PaymentData[]>({
    queryKey: ["/api/payments/history"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "failed":
        return "Falhado";
      case "cancelled":
        return "Cancelado";
      case "expired":
        return "Expirado";
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "active":
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPlanTypeText = (planType: string) => {
    switch (planType) {
      case "monthly":
        return "Mensal";
      case "quarterly":
        return "Trimestral";
      case "yearly":
        return "Anual";
      default:
        return planType;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Cartão de Crédito";
      case "pix":
        return "PIX";
      case "boleto":
        return "Boleto";
      default:
        return method;
    }
  };

  if (subscriptionLoading || paymentsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-acelera-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-acelera-blue">Meu Financeiro</h1>
        <p className="text-gray-600">Gerencie suas mensalidades e pagamentos</p>
      </div>

      {/* Plano Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-acelera-blue" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-acelera-blue">
                    {subscription.planName}
                  </h3>
                  <p className="text-gray-600">
                    {getPlanTypeText(subscription.planType)} • R$ {subscription.amount}
                  </p>
                </div>
                <Badge variant={getStatusVariant(subscription.status)} className="flex items-center gap-1 w-fit">
                  {getStatusIcon(subscription.status)}
                  {getStatusText(subscription.status)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Início do plano</p>
                  <p className="font-medium">
                    {format(new Date(subscription.startDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Próximo vencimento</p>
                  <p className="font-medium">
                    {format(new Date(subscription.endDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Método de pagamento</p>
                  <p className="font-medium">{getPaymentMethodText(subscription.paymentMethod)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-acelera-blue hover:bg-blue-700">
                  Alterar Plano
                </Button>
                <Button variant="outline">
                  Alterar Método de Pagamento
                </Button>
                <Button variant="ghost" className="text-red-600 hover:text-red-700">
                  Cancelar Assinatura
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Você não possui nenhum plano ativo</p>
              <Button className="bg-acelera-blue hover:bg-blue-700">
                Escolher Plano
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-acelera-blue" />
            Histórico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments && payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(payment.status)} className="flex items-center gap-1">
                          {getStatusIcon(payment.status)}
                          {getStatusText(payment.status)}
                        </Badge>
                        <span className="font-semibold">R$ {payment.amount}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {getPaymentMethodText(payment.paymentMethod)}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Vencimento</p>
                      <p className="font-medium">
                        {format(new Date(payment.dueDate), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                      {payment.paidDate && (
                        <>
                          <p className="text-sm text-gray-500 mt-1">Pago em</p>
                          <p className="text-sm font-medium text-green-600">
                            {format(new Date(payment.paidDate), "dd/MM/yyyy", { locale: ptBR })}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum pagamento encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}