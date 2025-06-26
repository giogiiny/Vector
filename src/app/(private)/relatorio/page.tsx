"use client";
import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Registra os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Cores da identidade visual
const colors = {
  primary: '#a51515',
  primaryLight: '#d43a3a',
  primaryDark: '#7d0404',
  background: '#edeced',
  white: '#ffffff',
  text: '#333333',
  lightGray: '#f3f3f3',
  riskLow: '#4caf50',
  riskMedium: '#ffc107',
  riskHigh: '#a51515'
};

// Componente de Indicador de Risco
const RiskIndicator = ({ value }: { value: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold" style={{ color: colors.primaryDark }}>{value}%</span>
        <span className="text-sm" style={{ color: colors.primaryDark }}>Regula</span>
      </div>
      <div 
        className="w-full rounded-full h-4 risk-bar-container"
        style={{
          backgroundColor: colors.lightGray,
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        <div
          className="h-4 rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: value < 20 ? colors.riskLow : 
                          value < 40 ? colors.riskMedium : colors.riskHigh,
            transition: 'width 0.5s ease'
          }}
        ></div>
      </div>
    </div>
  );
};

// Componente de Gráfico de Crescimento Semanal
const WeeklyGrowthChart = () => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Casos registrados',
        data: [12, 19, 30, 42],
        backgroundColor: colors.primaryLight,
        borderColor: colors.primaryDark,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

// Página Principal
const MonthlyReport = () => {
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // 1. Garante que os gráficos estejam renderizados
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Configurações do html2canvas
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: colors.white,
        ignoreElements: (el) => el.classList.contains('no-print'),
        onclone: (clonedDoc, element) => {
          // Garante que o fundo da barra de risco fique cinza
          const riskBars = element.querySelectorAll('.risk-bar-container');
          riskBars.forEach(bar => {
            (bar as HTMLElement).style.backgroundColor = colors.lightGray;
          });

          // Força a exibição dos gráficos
          const charts = element.querySelectorAll('canvas');
          charts.forEach(chart => {
            chart.style.display = 'block';
            chart.style.width = '100%';
            chart.style.height = 'auto';
          });
        }
      });

      // 3. Cria o PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio-mensal.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }} ref={reportRef}>
      <Head>
        <title>Relatório Mensal - VECTOR</title>
        <meta name="description" content="Relatório mensal sobre o risco epidemiológico do mosquito da dengue" />
      </Head>

      {/* Barra superior vermelha - não será incluída no PDF */}
      <div className="no-print" style={{
        width: '100%',
        height: '26px',
        background: `linear-gradient(90deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
      }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho com botão de voltar e download */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <IconButton
              onClick={() => router.back()}
              sx={{
                color: colors.primaryDark,
                mr: 2
              }}
              className="no-print"
            >
              <ArrowBackIcon />
            </IconButton>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primaryDark }}>Relatório mensal</h1>
              <h2 className="text-2xl" style={{ color: colors.primary }}>Janeiro 2025</h2>
            </div>
          </div>
          <IconButton
            onClick={handleDownloadPDF}
            sx={{
              color: colors.primaryDark,
            }}
            className="no-print"
          >
            <DownloadIcon />
            <span className="ml-2">PDF</span>
          </IconButton>
        </header>

        {/* Seção de Risco Epidemiológico */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primaryDark }}>Índice por zona</h3>

          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.white }}>
            <h4 className="text-lg font-medium mb-4" style={{ color: colors.primary }}>Risco epidemiológico</h4>

            <RiskIndicator value={28.6} />

            <div className="mt-6">
              <h5 className="font-medium mb-2" style={{ color: colors.primaryDark }}>Análise dos dados</h5>
              <p style={{ color: colors.text }}>
                O monitoramento mostra um aumento gradual nos casos nas últimas semanas,
                com foco principal na região noroeste. Recomenda-se intensificar as ações
                de prevenção nos bairros de Compensa e São Raimundo, que apresentaram os
                maiores índices de infestação.
              </p>
            </div>
          </div>
        </section>

        {/* Seção de Recomendações */}
        <section className="mb-10">
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.white }}>
            <h4 className="text-lg font-medium mb-4" style={{ color: colors.primary }}>Recomendação</h4>
            <div style={{ color: colors.text }}>
              Devido ao aumento dos casos, recomenda-se:
              <ul className="list-disc pl-5 mt-2">
                <li>Intensificar as ações de fumacê na região noroeste</li>
                <li>Realizar mutirões de limpeza nos bairros críticos</li>
                <li>Ampliar a distribuição de repelentes para a população</li>
                <li>Reforçar as campanhas de conscientização</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seção de Índice por Bairro */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primaryDark }}>Índice por bairro</h3>

          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.white }}>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {['Compensa', 'São Raimundo', 'Jorge Texeira', 'Cachoeirinha'].map((neighborhood) => (
                <li key={neighborhood} className="flex items-center">
                  <span
                    className="h-3 w-3 rounded-full mr-2"
                    style={{ backgroundColor: colors.primary }}
                  ></span>
                  <span style={{ color: colors.text }}>{neighborhood}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h5 className="font-medium mb-4" style={{ color: colors.primaryDark }}>Crescimento semanal</h5>
              <WeeklyGrowthChart />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MonthlyReport;